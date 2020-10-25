const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const password = process.argv[2];

const url = `mongodb+srv://damigreen:${password}@cluster0-9junr.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
});
userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);

// const newUser = new User({
//   username: 'dr_Cortex',
//   name: 'Cortex Evel',
//   password: 'fiafiaif883828333r'
// });

const newUser = new User({
  username: 'damigr',
  name: 'damilola faseun',
  password: 'fiafiaif883828333r'
});

newUser.save().then(result => {
  console.log('user saved');
  mongoose.connection.close();
})
  .catch(err => {
    console.log(err);
  });