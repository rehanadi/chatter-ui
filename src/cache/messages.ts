import { ApolloCache } from "@apollo/client";
import { Message } from "../gql/graphql";
import { getMessagesDocument } from "../hooks/useGetMessages";

export const updateMessages = (cache: ApolloCache<any>, newMessage: Message) => {
  const messagesQueryOptions = {
    query: getMessagesDocument,
    variables: {
      chatId: newMessage.chatId,
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