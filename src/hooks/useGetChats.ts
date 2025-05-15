import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

export const getChatsDocument = graphql(`
  query GetChats {
    chats {
      ...ChatFragment
    }
  }
`);

const useGetChats = () => {
  return useQuery(getChatsDocument);
}

export { useGetChats };