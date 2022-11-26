import { gql } from "@apollo/client";


const GET_USER_INFO = gql`
  query getUserInfo($userID: ID!) {
    getUserInfo (userID: $userID) {
        _id
        username
        email
        subscribedCountries
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    _id
    username
    email
    password
    subscribedCountries
  }
}
`;



export { GET_USER_INFO, CREATE_USER};