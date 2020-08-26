const { ApolloServer, UserInputError, gql} = require('apollo-server')
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose')
const Person = require('./models/Person')

mongoose.set('useFindAndModify', false)

MONGODB_URI='mongodb+srv://damigreen:4444@cluster0-9junr.mongodb.net/library-app?retryWrites=true&w=majority'

console.log('connecting to mongoDB');

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('conneted to mongoDB')
  })
  .catch((error) => {
    console.log('error connection to mongoDB:', error.message);
  })

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
    personCount: async () => await Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({});
      }

      const person = await Person.find(Person.where('phone').exists(args.phone === 'YES'));
      return person
    },
    findPerson: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      if (!person) {
        return null;
      }
      return person
    },
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
    addPerson: async (root, args) => {
        // const personObj = Person.find({ name: args.name })
        // if (personObj.name === args.name) {
        //   throw new UserInputError('Name must be unique', {
        //     invalidArgs: args.name
        //   });
        // }
        const person = new Person({ ...args, id: uuidv4() });

        try {
          await person.save();
        } catch (error) {
          console.log(error.message)
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
        

    },
    editNumber: async (root, args) => {
      // const person = persons.find(p => p.name === args.name)
      const person = await Person.findOne({ name: args.name })
      if (!person) {
        return null
      }

      person.phone = args.phone;
      try {
        person.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }
      return person;
    }
  },
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
