import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm'

// const query  = gql`
//   {
//     allPersons {
//       name
//       phone
//       address {
//         street
//         city
//       }
//       id
//     }
//   }
// `
// client.query({query})
//   .then(response => {
    // console.log(response.data)
//   })

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

const LOGIN = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

function App() {
  const client = useApolloClient();
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null)


  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message);
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000);
  }

  const persons = useQuery(ALL_PERSONS);
  const [addPerson] = useMutation(CREATE_PERSON, {
    onError: {handleError},
    refetchQueries: [{ query: ALL_PERSONS }]
  });
  const [editNumber] = useMutation(EDIT_NUMBER);
  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear();
    client.resetStore()
  }


  if (!token) {
    return (
      <div>
        {
          errorMessage&&
          <div style={{color: 'red'}}>
            {errorMessage}
          </div>
        }
        <h2>Login</h2>
        <LoginForm
          login={login}
          setToken={(token) => setToken(token)}
        />
      </div>
    )
  }
  
  return (
    <div>
      {errorMessage && 
       <div style={{color: 'red'}}>
         {errorMessage}
        </div>
      }
      <button type="button" onClick={logout}>logout</button>


      <Persons result={persons} />

      <PersonForm
        addUser={addPerson}
      />
      <PhoneForm
        editNumber={editNumber}
      />
    </div>
  );
}

export default App;
