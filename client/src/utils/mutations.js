import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        username
        email
      }
      token
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      user {
        username
        email
      }
      token
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookToSave: SaveBookInput!) {
    saveBook(bookToSave: $bookToSave) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;
