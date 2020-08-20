import React, { useState } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { Query, ApolloConsumer, Mutation } from 'react-apollo';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';


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
    // console.log(response.data)
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
      name: $name,
      phone: $phone,
      street: $street,
      city: $city
    ) {
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

const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
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
  const [errorMessage, setErrorMessage] = useState(null);
  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message);
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000);
  }

  return (
    <div>
      {errorMessage && 
       <div style={{color: 'red'}}>
         {errorMessage}
        </div>
      }

      <ApolloConsumer>
        {(client) => (
          <Query query={ALL_PERSONS} >
            {(result) => <Persons result={result} client={client} />} 
          </Query>
        )}
      </ApolloConsumer>
      <Mutation
        mutation={CREATE_PERSON}
        refetchQueries={[ {query: ALL_PERSONS} ]}
        onError={handleError}
      >
        {(addPerson) => (
          <PersonForm
            addUser={addPerson}
          />
        )}
      </Mutation>
      <Mutation
        mutation={EDIT_NUMBER}
      >
        {(editNumber) => (
          <PhoneForm
            editNumber={editNumber}
          />
        )}
      </Mutation>
    </div>
  );
}

export default App;
