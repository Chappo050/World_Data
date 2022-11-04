import { gql } from "@apollo/client";

const GET_ALL_COUNTRIES = gql`
  query GetAllCountries {
    getAllCountries {
      Country
      id
      Year
      Happiness_Rank
    }
  }
`;

export { GET_ALL_COUNTRIES };