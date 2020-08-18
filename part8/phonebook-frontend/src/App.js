import React from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { Query, ApolloConsumer, Mutation } from 'react-apollo';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';


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

const CREATE_PERSON = gql`
  mutation createPerson($name: String!, $phone: String!, $street: String!, $city: String!) {
    addPerson(
      name: $name
      phone: $phone
      street: $street
      city: $city
    ) {
      name
      phone
      address {
        street
        city
      }
    }
  }
`

function App() {
  return (
    <div>
      <ApolloConsumer>
        {(client) => (
          <Query query={ALL_PERSONS}>
            {(result) => <Persons result={result} client={client} />} 
          </Query>
        )}
      </ApolloConsumer>
      <Mutation mutation={CREATE_PERSON}>
        {(addPerson) => (
          <PersonForm
            addPerson={addPerson}
          />
        )}
      </Mutation>
    </div>
  );
}

export default App;
