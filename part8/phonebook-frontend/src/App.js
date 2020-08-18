import React from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { Query, ApolloConsumer } from 'react-apollo';
import Persons from './components/Persons';

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

const ALL_PERSONS = gql`
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

function App() {
  return (
    <ApolloConsumer>
      {(client) => (
        <Query query={ALL_PERSONS}>
          {(result) => <Persons result={result} client={client} />} 
        </Query>
      )}
    </ApolloConsumer>
  );
}

export default App;
