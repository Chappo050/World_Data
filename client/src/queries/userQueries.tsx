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

const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
  loginUser(input: $input) {
    _id
    username
    email
    password
    subscribedCountries
  }
}
`;

const LOGOUT_USER = gql`
  mutation LogoutUser {
  logoutUser {
    username
  }
}
`;



export { GET_USER_INFO, CREATE_USER, LOGIN_USER,LOGOUT_USER};