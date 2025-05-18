import { useEffect, useMemo, useState } from "react";
import List from '@mui/material/List';
import ChatListItem from "./chat-list-item/ChatListItem";
import { Divider, Stack } from "@mui/material";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import ChatListAdd from "./chat-list-add/ChatListAdd";
import { useGetChats } from "../../hooks/useGetChats";
import { usePath } from "../../hooks/usePath";
import { useMessageCreated } from "../../hooks/useMessageCreated";
import { PAGE_SIZE } from "../../constants/page-size";

const ChatList = () => {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");
  const { data } = useGetChats({
    skip: 0,
    limit: PAGE_SIZE,
  });
  const { path } = usePath();

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
        <List
          sx={{
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto',
            bgcolor: 'background.paper',
          }}
        >
          {sortedChats.map((chat) => (
            <ChatListItem
              key={chat._id}
              chat={chat}
              selected={selectedChatId === chat._id}
            />
          ))}
        </List>
      </Stack>
    </>
  );
}

export default ChatList;