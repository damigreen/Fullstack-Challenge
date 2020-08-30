import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useApolloClient } from '@apollo/react-hooks'
import { FIND_PERSON } from '../queries'


const Persons = ({ result }) => {
  const [person, setPerson] = useState(null);
  const client = useApolloClient();

  if (result.loading) {
    return (
      <div>loading...</div>
    )
  }

  const showPerson = async (name) => {
    const { data } = await client.query({
      query: FIND_PERSON,
      variables: { nameToSearch: name },
      fetchPolicy: 'no-cache'
    })
    setPerson(data.findPerson)
  }

  const persons = result.data.allPersons;

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>{person.address.street} {person.address.city}</div>
        <div>{person.phone}</div>
        <button onClick={() => setPerson(null)}>close</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p => (
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => showPerson(p.name)}>
            show address
          </button>
        </div>
      ))}
    </div>
  )
}

export default Persons;
