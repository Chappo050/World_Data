import { gql } from "apollo-server-express"; //will create a schema

module.exports = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    subscribedCountries: [String]
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

   input UpdateUserInfo{
    username: String
    email: String
    password: String
        subscribedCountries: [String]
    }

    input AppendSubscriptoin{
       newCountry: String
    }

  type DeletePayload{
        userID: ID!
    }

 
  #handle user commands
  type Query {
    getAllUsers: [User]
    getUserInfo(userID: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUserInfo(userID: ID!, input: UpdateUserInfo!): User!
    updateSubscriptoins(userID: ID!, input: AppendSubscriptoin!): User!
    deleteUser(userID: ID!): DeletePayload!
  }
`;
//export this Schema so we can use it in our project
