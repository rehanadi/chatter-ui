import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import { Avatar, Box, Divider, Grid, IconButton, InputBase, Paper, Stack, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";

const Chat = () => {
  const params = useParams();
  const chatId = params._id!;
  const location = useLocation();

  const [message, setMessage] = useState("");
  const lastRef = useRef<HTMLDivElement | null>(null);

  const [createMessage] = useCreateMessage(chatId);
  const { data } = useGetChat({ _id: chatId });
  const { data: messages } = useGetMessages({ chatId });

  const scrollToBottom = () => lastRef.current?.scrollIntoView();

  useEffect(() => {
    setMessage("");
    scrollToBottom();
  }, [location, messages]);

  const handleCreateMessage = async () => {
    await createMessage({
      variables: {
        createMessageInput: {
          chatId,
          content: message,
        },
      },
    });

    setMessage("");
    scrollToBottom();
  };

  return (
    <Stack
      sx={{
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <h1>{data?.chat.name}</h1>
      <Box
        sx={{
          maxHeight: "70vh",
          overflow: "auto",
        }}
      >
        {messages?.messages.map((message) => (
          <Grid
            key={message._id}
            container
            alignItems="center"
            marginBottom="1rem"
          >
            <Grid size={{ xs: 2, lg: 1 }}>
              <Avatar
                src=""
                sx={{
                  width: 52,
                  height: 52,
                }}
              />
            </Grid>
            <Grid size={{ xs: 10, lg: 11 }}>
              <Stack>
                <Paper
                  sx={{ width: "fit-content" }}
                >
                  <Typography
                    sx={{ padding: "0.9rem" }}
                  >
                    {message.content}
                  </Typography>
                </Paper>
                <Typography
                  variant="caption"
                  sx={{ marginLeft: "0.25rem" }}
                >
                  {new Date(message.createdAt).toLocaleTimeString()}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        ))}      
        <div ref={lastRef}></div>
      </Box>
      <Paper
        sx={{
          width: "100%",
          p: "2px 4px",
          justifySelf: "flex-end",
          display: "flex",
          alignItems: "center",
          marginY: "1rem",
        }}
      >
        <InputBase
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              await handleCreateMessage();
            }
          }}
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
          onClick={handleCreateMessage}
          sx={{ p: "10px" }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;