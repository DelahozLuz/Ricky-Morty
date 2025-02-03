import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URI, 
  cache: new InMemoryCache(),
});
console.log(import.meta.env.VITE_GRAPHQL_URI);


export default client;
