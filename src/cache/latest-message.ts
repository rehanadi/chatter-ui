import { ApolloCache } from "@apollo/client";
import { Message } from "../gql/graphql";
import { getChatsDocument } from "../hooks/useGetChats";

export const updateLatestMessage = (cache: ApolloCache<any>, newMessage: Message) => {
  const chats = [
    ...(cache.readQuery({ query: getChatsDocument })?.chats || [])
  ];

  const cachedChatIndex = chats.findIndex((chat) => chat._id === newMessage.chatId);
  if (cachedChatIndex === -1) return;

  const cachedChat = chats[cachedChatIndex];
  const cachedChatCopy = { ...cachedChat, latestMessage: newMessage };
  chats[cachedChatIndex] = cachedChatCopy;

  cache.writeQuery({
    query: getChatsDocument,
    data: {
      chats,
    },
  });
};