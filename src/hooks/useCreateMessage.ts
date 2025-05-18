import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { updateMessages } from "../cache/messages";
import { updateLatestMessage } from "../cache/latest-message";

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
      if (!data?.createMessage) return;
      updateMessages(cache, data.createMessage);
      updateLatestMessage(cache, data.createMessage);
    },
  });
}

export { useCreateMessage };