import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks'
// import { ApolloClient } from 'apollo-client'
import {createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
// import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';


const client = new ApolloClient({
  uri: 'http://localhost:4000'
})

// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000/graphql'
// })


// // Adding token from localstorage
// // and set as the Authorization headers
// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('phonenumbers-user-token');
//   console.log(token)

//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `bearer ${token}` : null
//     }
//   }
// })

// // ApolloConstructure function using the parameters
// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// })

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
