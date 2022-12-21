import { gql } from "apollo-server-express"; //will create a schema

module.exports = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    subscribedCountriesCode: [String]
    subscribedCountriesName: [String]
    token: String
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInfo {
    username: String
    email: String
    password: String
    subscribedCountriesCode: [String]
    subscribedCountriesName: [String]
  }

  input AppendSubscription {
    newCountry: String
  }

  input LoginInput {
    username: String
    password: String
  }

  type DeletePayload {
    userID: ID!
  }

  type LogoutData {
    username: String
  }

  #handle user commands
  type Query {
    getAllUsers: [User]
    getUserInfo: User
  }


  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUserInfo(input: UpdateUserInfo!): User!
    updateSubscriptions(userID: ID!, input: AppendSubscription!): User!
    deleteUser(userID: ID!): DeletePayload!
    loginUser(input: LoginInput): User
    logoutUser: LogoutData
  }
`;
//export this Schema so we can use it in our project
