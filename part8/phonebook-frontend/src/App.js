import React from 'react';
import ApolloClient, { gql } from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'http://localhost:4000'
})

const query  = gql`
  {
    allPersons {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`
client.query({query})
  .then(response => {
    console.log(response)
    console.log(response.data)
  })

function App() {
  return (
    <div className="App">
      Hello Apollo Client
    </div>
  );
}

export default App;
