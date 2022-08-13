import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_SCORE = gql`
  mutation newScore($highScore: Int!) {
    newScore(highScore: $highScore) 
    {
        username
        highScore
    }
  }
`;

export const DELETE_USER = gql`
  mutation removeUser($_id: ID!) {
    removeUser(_id: $_id) 
    {
        username
    }
  }
`;
