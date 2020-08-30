import { gql } from 'apollo-boost'

const PERSON_DETAILS = gql`
fragment personDetails on Person {
  name
  phone
  address {
    street
    city
  }
}
`

export const ALL_PERSONS = gql`
  {
    allPersons {
      ...personDetails
    }
  }
  ${PERSON_DETAILS}
`


export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      ...personDetails
    }
  }
  ${PERSON_DETAILS}
`

export const CREATE_PERSON = gql`
  mutation createPerson($name: String!, $phone: String!, $street: String!, $city: String!) {
    addPerson(
      name: $name,
      phone: $phone,
      street: $street,
      city: $city
    ){
      ...personDetails
    }
  }
  ${PERSON_DETAILS}
`

export const EDIT_NUMBER = gql`
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

export const LOGIN = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const PERSON_ADDED = gql`
  subscription {
    personAdded {
      ...personDetails
  }
}
${PERSON_DETAILS}
`