import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { API_URL, WS_URL } from "./urls";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/logout";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

// Create middleware to redirect to login page on 401 errors
const logoutLink = onError((error) => {
  if (
    error.graphQLErrors?.length &&
    (error.graphQLErrors[0].extensions?.originalError as any)?.statusCode === 401 &&
    !excludedRoutes.includes(window.location.pathname)
  ) {
    onLogout();
  }
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${WS_URL}/graphql`,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          chats: {
            // Indicates that none of the query arguments should be used as cache keys for the chats field
            keyArgs: false,
            merge(existing = [], incoming, { args }: any) {
              const merged = existing ? existing.slice(0) : [];

              console.log("existing:", existing);
              console.log("incoming:", incoming);
              console.log("args:", args);
              console.log("merged1:", merged);

              // Merge the incoming array into the existing array
              for (let i = 0; i < incoming.length; ++i) {
                merged[args.skip + i] = incoming[i];
              }

              console.log("merged2:", merged);
              
              return merged;
            },
          },
        },
      },
    },
  }),
  link: logoutLink.concat(splitLink),
});

export default client;