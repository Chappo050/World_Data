import React from "react";
import ReactDOM from "react-dom/client";
import RouteSwitch from "./RouterSwitch";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


root.render(
  <React.StrictMode>
    <ApolloProvider client={client} >
      <RouteSwitch />
    </ApolloProvider>
  </React.StrictMode>
);
