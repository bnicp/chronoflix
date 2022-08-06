const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Score {
    userId: String!
    score: Int!
  }

  input newScore {
    userId: String
    score: Int
  }

  type Query {
    me: User
    allUsers: [User]
    highscores: [Score]
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    newScore(newScore: newScore!): Score
  }
`;

module.exports = typeDefs;
