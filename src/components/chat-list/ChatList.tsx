import { useState } from "react";
import List from '@mui/material/List';
import ChatListItem from "./chat-list-item/ChatListItem";
import { Divider, Stack } from "@mui/material";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import ChatListAdd from "./chat-list-add/ChatListAdd";
import { useGetChats } from "../../hooks/useGetChats";

const ChatList = () => {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const { data } = useGetChats();

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
            maxWidth: 360,
            maxHeight: '80vh',
            overflow: 'auto',
            bgcolor: 'background.paper',
          }}
        >
          {data?.chats.map((chat) => (
            <ChatListItem
              key={chat._id}
              chat={chat}
            />
          ))}
        </List>
      </Stack>
    </>
  );
}

export default ChatList;