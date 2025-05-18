import { ApolloCache } from "@apollo/client";
import { Message } from "../gql/graphql";
import { getMessagesDocument } from "../hooks/useGetMessages";
import { PAGE_SIZE } from "../constants/page-size";

export const updateMessages = (cache: ApolloCache<any>, newMessage: Message) => {
  const messagesQueryOptions = {
    query: getMessagesDocument,
    variables: {
      chatId: newMessage.chatId,
      skip: 0,
      limit: PAGE_SIZE,
    },
  };

  const messages = cache.readQuery(messagesQueryOptions);

  cache.writeQuery({
    ...messagesQueryOptions,
    data: {
      messages: (messages?.messages || []).concat(newMessage),
    },
  });
}