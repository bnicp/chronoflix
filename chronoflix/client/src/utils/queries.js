import { gql } from "@apollo/client";

export const GET_ME = gql`
  query userData {
    me {
      _id
      username
      email
      password
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;
