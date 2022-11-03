import { gql } from "graphql-request";

//create our query
const getAllPeopleQuery = gql`
  query {
    getAllPeople { #run the getAllPeople command
      id
      name
    }
  }
`;
//Next, declare a mutation
const addPersonMutation = gql`
  mutation addPeople($name: String!) {
    addPerson(name: $name) { #add a new entry. Argument will be 'name'
      id
      name
    }
  }
`;
export { getAllPeopleQuery, addPersonMutation };