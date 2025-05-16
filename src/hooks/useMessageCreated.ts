import { useSubscription } from "@apollo/client";
import { graphql } from "../gql";
import { SubscriptionMessageCreatedArgs } from "../gql/graphql";

const messageCreatedDocument = graphql(`
  subscription MessageCreated($chatId: String!) {
    messageCreated(chatId: $chatId) {
      ...MessageFragment
    }
  }
`);

const useMessageCreated = (variables: SubscriptionMessageCreatedArgs) => {
  return useSubscription(messageCreatedDocument, { variables });
};

export { useMessageCreated };