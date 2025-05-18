import { useEffect, useMemo, useState } from "react";
import ChatListItem from "./chat-list-item/ChatListItem";
import { Box, Divider, Stack } from "@mui/material";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import ChatListAdd from "./chat-list-add/ChatListAdd";
import { useGetChats } from "../../hooks/useGetChats";
import { usePath } from "../../hooks/usePath";
import { useMessageCreated } from "../../hooks/useMessageCreated";
import { PAGE_SIZE } from "../../constants/page-size";
import InfiniteScroll from "react-infinite-scroller";
import { useCountChats } from "../../hooks/useCountChats";

const ChatList = () => {
  const { path } = usePath();
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");
  const { chatsCount, countChats } = useCountChats();
  const { data, fetchMore } = useGetChats({
    skip: 0,
    limit: PAGE_SIZE,
  });

  const sortedChats = useMemo(() => {
    if (!data?.chats) return [];

    return [...data.chats].sort((a, b) => {
      if (!a.latestMessage) return -1;

      return (
        new Date(a.latestMessage?.createdAt).getTime() -
        new Date(b.latestMessage?.createdAt).getTime()
      );
    }).reverse();
  }, [data?.chats]);

  useMessageCreated({ chatIds: data?.chats.map((chat) => chat._id) || [] });

  useEffect(() => {
    countChats();
  }, [countChats]);

  useEffect(() => {
    const pathSplit = path.split("/");
    if (pathSplit.length === 2) {
      setSelectedChatId(pathSplit[1]);
    }
  }, [path]);

  return (
    <>
      <ChatListAdd
        open={chatListAddVisible}
        onClose={() => setChatListAddVisible(false)}
      />
      <Stack>
        <ChatListHeader onAddChat={() => setChatListAddVisible(true)} />
        <Divider />
        <Box
          sx={{
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto',
            bgcolor: 'background.paper',
          }}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={() => fetchMore({
              variables: {
                skip: data?.chats.length || 0,
                limit: PAGE_SIZE,
              },
            })}
            hasMore={
              data?.chats && chatsCount ?
                data.chats.length < chatsCount :
                false
            }
            useWindow={false}
          >
            {sortedChats.map((chat) => (
              <ChatListItem
                key={chat._id}
                chat={chat}
                selected={selectedChatId === chat._id}
              />
            ))}
          </InfiniteScroll>
        </Box>
      </Stack>
    </>
  );
}

export default ChatList;