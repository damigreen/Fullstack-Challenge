import React from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

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
    <Query query={ALL_PERSONS}>
      {(result) => {
        if (result.loading) {
          return <div>Loading...</div>
        }
        return (
          <div>
            {result.data.allPersons.map(person => person.name).join(', ')}
          </div>
        )
      }}
    </Query>
  );
}

export default App;
