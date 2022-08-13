const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    highScore: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    allUsers: [User]
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    newScore(highScore: Int!): User
    removeUser(_id: ID!): User
  }
`;

module.exports = typeDefs;
