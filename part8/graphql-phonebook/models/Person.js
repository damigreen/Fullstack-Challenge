const { ApolloServer, UserinputError, gql } = require('apollo-server')
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  phone: {
    type: String,
    minlenght: 5,
    required:true,
  },
  street: {
    type: String,
    required: true,
    minlength: true,
  },
  city: {
    type: String,
    required: true,
    minlength: 3,
  },
})

module.exports = mongoose.model('Person', schema)


