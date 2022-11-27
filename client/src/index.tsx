import React from "react";
import ReactDOM from "react-dom/client";
import RouteSwitch from "./RouterSwitch";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";

const link = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
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
