import React from 'react';

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
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

const Persons = ({ result }) => {
  const [person, setPerson] = useState(null);

  if (result.loading) {
    return (
      <div>loading...</div>
    )
  }

  const persons = result.data.allPersons;

  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p => 
        <div key={p.name}>{p.name} {p.phone}</div>
      )}
    </div>
  )
}

export default Persons;
