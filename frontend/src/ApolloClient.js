// src/ApolloClient.js
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'https://your-graphql-endpoint.com/graphql', // Replace with your GraphQL endpoint
});

// Middleware to set the authorization header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token'); // Replace with your authentication logic
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Apollo Client setup
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
