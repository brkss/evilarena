import React from "react";
import ReactDOM from "react-dom/client";
import { Application } from "./Application";
import { ChakraProvider } from "@chakra-ui/react";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { getToken, setToken } from "./utils/token/token";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { URL } from "./utils/config/default";
//import { ApolloClient } from '@apo'
import { ApolloClient } from "@apollo/client";
import { onError } from "apollo-link-error";
import { ApolloProvider } from "@apollo/react-hooks";
import { HttpLink } from "apollo-boost";

const cache : any = new InMemoryCache({});

const requestLink = new ApolloLink((operation, forward) => {
  const token = getToken();
  if (token) {
    operation.setContext({
      headers: {
        authorization: `bearer ${token}`,
      },
    });
  }
  return forward(operation);
});

const link: any = new TokenRefreshLink({
  accessTokenField: "token",
  isTokenValidOrUndefined: () => {
    const token = getToken();
    if (!token) return true;
    try {
      const { exp } = jwtDecode(token) as any;
      if (Date.now() >= exp * 1000) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch(`${URL}/refresh_token`, {
      method: "POST",
      credentials: "include",
    });
  },
  handleFetch: (accessToken) => {
    setToken(accessToken);
  },
  handleError: (err) => {
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  },
});

const httpLink = ApolloLink.from([
  link,
  onError(({ graphQLErrors, networkError }) => {
    console.log(graphQLErrors);
    console.log(networkError);
  }),
  requestLink,
  new HttpLink({
    uri: `${URL}/graphql`,
    credentials: "include",
  }),
]);

const client: any = new ApolloClient({
  link: httpLink as any,
  cache,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Application />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
);
