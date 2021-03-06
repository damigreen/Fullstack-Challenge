const { ApolloServer, UserInputError, gql, AuthenticationError, PubSub} = require('apollo-server')
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose')
const Person = require('./models/Person')
const User = require('./models/User')
const jwt = require('jsonwebtoken')

const pubSub = new PubSub()

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY';

mongoose.set('useFindAndModify', false)

const MONGODB_URI='mongodb+srv://damigreen:4444@cluster0-9junr.mongodb.net/library-app?retryWrites=true&w=majority'

console.log('connecting to mongoDB');

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('conneted to mongoDB')
  })
  .catch((error) => {
    console.log('error connection to mongoDB:', error.message);
  })

// let persons = [
//   {
//     name: "Faseun Damilola",
//     phone: "070 619 5742",
//     street: "5, Alhaja Adijatu Close",
//     city: "Lagos",
//     id: "3d594650-3436-11e9-bc57-8b80ba54c431"
//   },
//   {
//     name: "Luke Skywalker",
//     phone: "040-432342",
//     street: "Obafemi Awolowo Street",
//     city: "Lagos",
//     id: '3d59fi930-3438-11e9-bc57-8b80bdkai4c431'
//   },
//   {
//     name: "Samuel W. Jackson",
//     phone: "080 782 9909",
//     street: "25 Hollywood Street",
//     city: "Helsinki",
//     id: '3d59adj-3436-11e9-bc57-8bvav54c431'
//   },
// ]

const typeDefs = gql`
  type Address {
    street: String!
    city: String! 
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    friendOf: [User!]!
    id: ID!
  }

  enum YesNo {
    YES
    NO
  }

  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
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
    createUser(
      username: String!
      ) : User
    login(
      username: String!
      password: String!
    ) : Token
    addAsFriend(
      name: String!
    ): User
  }

  # When a new person is added all the details are sent to all subscribers
  type Subscription {
    personAdded: Person!
  }
`

const resolvers = {
  Query: {
    personCount: async () => await Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({}).populate('friendOf');
      }

      const person = await Person.find(Person.where('phone').exists(args.phone === 'YES')).populate('friendOf');
      return person;
    },
    findPerson: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      if (!person) {
        return null;
      }
      return person
    },
    me: (root, args, context) => {
      return context.currentUser;
    }
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    },
    friendOf: async (root) => {
      // Return list of users
      console.log(root.name)
      const friends = await User.find({
        friends: {
          $in: [root.id]
        }
      })
      return friends
    }
  },
  Mutation: {
    addPerson: async (root, args, context) => {
        const person = new Person({ ...args, id: uuidv4() });
        // const currentUser = context.currentUser;

        // if (!currentUser) {
        //   throw new AuthenticationError("not authenticated")
        // }
        
        try {
          await person.save();
          // currentUser.friends = currentUser.friends.concact(person)
          // await currentUser.save();
        } catch (error) {
          console.log(error.message)
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }

        pubSub.publish('PERSON_ADDED', { personAdded: person })
        return person;
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
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          });
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        console.log('error:============')
        throw new UserInputError("Wrong Credentials")
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      // console.log(userForToken)
      return { value: jwt.sign(userForToken, JWT_SECRET ) }
    },
    addAsFriend: async (root, args, { currentUser }) => {
      const nonFriendAlready = (person) => {
        return !currentUser.friends.map(f => f._id).includes(person._id)
      }

      if (!currentUser) {
        throw new AuthenticationError("Not authenticated")
      }

      const person = await Person.findOne({ name: args.name })
      if (nonFriendAlready(person))  {
        currentUser.friends = currentUser.friends.concat(person)
      }
      await currentUser.save()

      return currentUser;
      
    }
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubSub.asyncIterator(['PERSON_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
