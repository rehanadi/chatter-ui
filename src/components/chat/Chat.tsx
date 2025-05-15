import { useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import { Box, Divider, IconButton, InputBase, Paper, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";

const Chat = () => {
  const params = useParams();
  const chatId = params._id!;

  const [message, setMessage] = useState("");

  const [createMessage] = useCreateMessage(chatId);
  const { data } = useGetChat({ _id: chatId });
  const { data: messages } = useGetMessages({ chatId });

  return (
    <Stack
      sx={{
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <h1>{data?.chat.name}</h1>
      <Box>
        {messages?.messages.map((message) => (
          <p key={message._id}>
            {message.content}
          </p>
        ))}         
      </Box>
      <Paper
        sx={{
          width: "100%",
          p: "2px 4px",
          justifySelf: "flex-end",
          display: "flex",
          alignItems: "center",
        }}
      >
        <InputBase
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            ml: 1,
            flex: 1,
            width: "100%",
          }}
        />
        <Divider
          sx={{
            height: 28,
            m: 0.5,
          }}
          orientation="vertical"
        />
        <IconButton
          color="primary"
          onClick={() => {
            createMessage({
              variables: {
                createMessageInput: {
                  chatId,
                  content: message,
                },
              },
            });
          }}
          sx={{ p: "10px" }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;