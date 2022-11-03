import { gql } from "apollo-server-express"; //will create a schema

module.exports = gql`
  type Country {
    id: ID!
    Country: String!
    Reigon: String
    Happiness_Rank:   Int!
    Happiness_Score:  Float!
    Standard_Error:   Float
    Lower_Confidence_Interval:   Float
    Upper_Confidence_Interval:  Float
    Whisker_high:  Float
    Whisker_low:  Float
    Economy_GDP_per_Capita:  Float!
    Family:  Float!
    Health_Life_Expectancy:   Float!
    Freedom: Float!
    Trust_Government_Corruption:  Float!
    Generosity:  Float!
    Dystopia_Residual:  Float!
    Year: Int!
  }
  
  #handle user commands
  type Query {
    getAllCountries: [Country],
  }

`;
//export this Schema so we can use it in our project
