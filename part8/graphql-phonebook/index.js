const { ApolloServer, UserInputError, gql} = require('apollo-server')
const { v4: uuidv4 } = require('uuid');

let persons = [
  {
    name: "Faseun Damilola",
    phone: "070 619 5742",
    street: "5, Alhaja Adijatu Close",
    city: "Lagos",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Luke Skywalker",
    phone: "040-432342",
    street: "Obafemi Awolowo Street",
    city: "Lagos",
    id: '3d59fi930-3438-11e9-bc57-8b80bdkai4c431'
  },
  {
    name: "Samuel W. Jackson",
    phone: "080 782 9909",
    street: "25 Hollywood Street",
    city: "Helsinki",
    id: '3d59adj-3436-11e9-bc57-8bvav54c431'
  },
]

const typeDefs = gql`
  type Address {
    street: String!
    city: String! 
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  enum YesNo {
    YES
    NO
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }
  
  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
  }


`

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.phone) {
        return persons
      }
      const byPhone = (persons) =>
        args.phone = 'YES' ? persons.phone : !persons.phone
      return persons.filter(byPhone);
    },
    findPerson: (root, args) =>
      persons.find(p => p.name === args.name)
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    }
  },
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find(p => p.name === args.name)) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name,
        })
      }

      const person = { ...args, id: uuidv4() }
        return person
    },
    editNumber: (root, args) => {
      const person = persons.find(p => p.name === args.name)
      if (!persons) {
        return null
      }

      const updatedPerson = { ...person, phone: args.phone }
      persons.map(p => p.name === args.name ? updatedPerson : p)
      return updatedPerson
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
