import { useSubscription } from "@apollo/client";
import { graphql } from "../gql";
import { SubscriptionMessageCreatedArgs } from "../gql/graphql";
import { updateMessages } from "../cache/messages";
import { updateLatestMessage } from "../cache/latest-message";

const messageCreatedDocument = graphql(`
  subscription MessageCreated($chatIds: [String!]!) {
    messageCreated(chatIds: $chatIds) {
      ...MessageFragment
    }
  }
`);

const useMessageCreated = (variables: SubscriptionMessageCreatedArgs) => {
  return useSubscription(messageCreatedDocument, {
    variables,
    // Handle incoming subscription data and perform actions when new data is received from the server
    onData: ({ client, data }) => {
      if (!data.data) return;
      updateMessages(client.cache, data.data.messageCreated);
      updateLatestMessage(client.cache, data.data.messageCreated);
    },
  });
};

export { useMessageCreated };