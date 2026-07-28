export const useNetworkOnlyGraphql =
  process.env.NODE_ENV === "development" ||
  process.env.NEXT_PUBLIC_GRAPHQL_NETWORK_ONLY === "true";

export const graphqlRevalidate = useNetworkOnlyGraphql ? 1 : 60;
