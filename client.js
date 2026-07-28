import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useNetworkOnlyGraphql } from "utils/core/graphqlSettings";

const isDevelopment = process.env.NODE_ENV === "development";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
  cache: new InMemoryCache(),
  connectToDevTools: isDevelopment,
  defaultOptions: {
    query: {
      fetchPolicy: useNetworkOnlyGraphql ? "network-only" : "cache-first",
    },
    watchQuery: {
      fetchPolicy: useNetworkOnlyGraphql ? "network-only" : "cache-first",
    },
  },
});

export default client;
