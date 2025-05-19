import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import { Avatar, Box, Divider, Grid, IconButton, InputBase, Paper, Stack, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import { PAGE_SIZE } from "../../constants/page-size";
import { useCountMessages } from "../../hooks/useCountMessages";
import InfiniteScroll from "react-infinite-scroller";

const Chat = () => {
  const params = useParams();
  const chatId = params._id!;
  const location = useLocation();

  const [message, setMessage] = useState("");
  const lastRef = useRef<HTMLDivElement | null>(null);

  const [createMessage] = useCreateMessage(chatId);
  const { data } = useGetChat({ _id: chatId });
  const { messagesCount, countMessages } = useCountMessages(chatId);
  const { data: messages, fetchMore } = useGetMessages({
    chatId,
    skip: 0,
    limit: PAGE_SIZE,
  });

  const scrollToBottom = () => lastRef.current?.scrollIntoView();

  const sortedMessages = useMemo(() => {
    if (!messages?.messages) return [];

    return [...messages.messages].sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  }, [messages?.messages]);

  useEffect(() => {
    countMessages();
  }, [countMessages]);

  useEffect(() => {
    // Only scroll to bottom on the first page
    if (messages?.messages && messages.messages.length <= PAGE_SIZE) {
      setMessage("");
      scrollToBottom();
    }
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
        <InfiniteScroll
          pageStart={0}
          isReverse={true}
          loadMore={() => fetchMore({
            variables: {
              skip: messages?.messages.length || 0,
              limit: PAGE_SIZE,
            },
          })}
          hasMore={
            messages?.messages && messagesCount
              ? messages.messages.length < messagesCount
              : false
          }
          useWindow={false}
        >
          {sortedMessages.map((message) => (
            <Grid
              key={message._id}
              container
              alignItems="center"
              marginBottom="1rem"
            >
              <Grid size={{ xs: 2, lg: 1 }}>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Avatar
                    src={message.user.imageUrl}
                    sx={{
                      width: 52,
                      height: 52,
                    }}
                  />
                  <Typography variant="caption">
                    {message.user.username}
                  </Typography>
                </Stack>
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
                    {new Date(message.createdAt).toLocaleTimeString()} -{" "}
                    {new Date(message.createdAt).toLocaleDateString()}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          ))}
        </InfiniteScroll>
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