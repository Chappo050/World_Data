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



export { GET_USER_INFO};