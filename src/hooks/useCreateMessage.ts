import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { getMessagesDocument } from "./useGetMessages";

const createMessageDocument = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragment
    }
  }
`);

const useCreateMessage = (chatId: string) => {
  // Update specific message cache with chat id
  return useMutation(createMessageDocument, {
    update(cache, { data }) {
      const messagesQueryOptions = {
        query: getMessagesDocument,
        variables: { chatId },
      };

      const messages = cache.readQuery({ ...messagesQueryOptions });
      // if (!messages || !data?.createMessage) return;
      const existingMessages = messages?.messages || [];
      const newMessages = data?.createMessage || [];

      cache.writeQuery({
        ...messagesQueryOptions,
        data: {
          messages: existingMessages.concat(newMessages),
        }
      });
    },
  });
}

export { useCreateMessage };