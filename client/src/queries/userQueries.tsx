import { gql } from "@apollo/client";


const GET_USER_INFO = gql`
  query getUserInfo {
    getUserInfo{
        _id
        username
        email
        subscribedCountriesCode
        subscribedCountriesName
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
  }
}
`;

const UPDATE_USER_INFO = gql`
mutation UpdateUserInfo($input: UpdateUserInfo!) {
  updateUserInfo(input: $input) {
    subscribedCountriesCode
    subscribedCountriesName
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



export { GET_USER_INFO, CREATE_USER, LOGIN_USER,LOGOUT_USER, UPDATE_USER_INFO};