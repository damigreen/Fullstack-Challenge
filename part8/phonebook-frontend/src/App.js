import React, { useState } from 'react';
import { useQuery, useMutation, useApolloClient, useSubscription } from '@apollo/react-hooks'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm'
import { ALL_PERSONS } from './queries'
import { CREATE_PERSON } from './queries'
import { EDIT_NUMBER } from './queries'
import { LOGIN } from './queries'
import { PERSON_ADDED } from './queries'


const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }

  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}


function App() {
  const client = useApolloClient();
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 2000);
  }
  
  // Prevent new created persons to be added to the cache twice
  const updateCacheWith = (addedPerson) => {
    const includeIn = (set, object) => {
      set.map(p => p.id).includes(object.id)
    }

    const dataInStore = client.readQuery({ query: ALL_PERSONS })
    if (!includeIn(dataInStore.allPersons, addedPerson)) {
      client.writeQuery({
        client: ALL_PERSONS,
        data: { allPersons: dataInStore.allPersons.concat(addPerson)}
      })
    }
  }

  useSubscription(PERSON_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      // console.log(subscriptionData)
      const addedPerson = subscriptionData.data.personAdded
      notify(`${addedPerson.name} added`)
      updateCacheWith(addedPerson)
    }
  })

  const persons = useQuery(ALL_PERSONS);
  const [addPerson] = useMutation(CREATE_PERSON, {
    onError: handleError,
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_PERSONS })
      dataInStore.allPersons.push(response.data.addPerson)
      store.writeQuery({
        query: ALL_PERSONS,
        data: dataInStore,
      })
    }
  });
  const [editNumber] = useMutation(EDIT_NUMBER);
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear();
    client.resetStore()
  }

  // useEffect(() => {
  //   if (result.data) {
  //     const token = result.data.login.value
  //     setToken(token)
  //     console.log(token)
  //     localStorage.setItem('phonenumbers-user-token', token);
  //   }
  // }, [result.data])


  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage}
        />
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
      <Notify errorMessage={errorMessage}
      />
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
