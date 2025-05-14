import { gql, useQuery } from "@apollo/client"
import { User } from "../models/User";

const GET_ME = gql`
  query Me {
    me {
      _id
      email
    }
  }
`;

const useGetMe = () => {
  return useQuery<{ me: User }>(GET_ME, {
    errorPolicy: "all",
    onError: (err) => {
      console.error(err);
    },
  });
}

export { useGetMe };