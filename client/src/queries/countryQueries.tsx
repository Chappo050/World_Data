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

const GET_COUNTRY_DATA = gql`
  query getCountryData($countryName: String!) {
    getCountryData (countryName: $countryName) {
      Country
      id
      Year
      Happiness_Rank
    }
  }
`;

const GET_COUNTRY_YEAR_DATA = gql`
  query getCountryYearData($countryName: String!, $year: Int!) {
    getCountryYearData(countryName: $countryName, year: $year) {
      Country
      Year
      Happiness_Rank
      Economy_GDP_per_Capita
      Family
      Health_Life_Expectancy
      Freedom
      Generosity
      Trust_Government_Corruption
    }
  }
`;

export { GET_ALL_COUNTRIES, GET_COUNTRY_DATA, GET_COUNTRY_YEAR_DATA };