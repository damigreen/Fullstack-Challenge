const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as third argument');
  process.exit(1); 
}

const password = process.argv[2];

const url = `mongodb+srv://damigreen:${password}@cluster0-9junr.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true })
  .then(() => console.log('connected to DB', url))
  .catch(error => console.log('unable to connect to the db', error));

const noteSchema = new mongoose.Schema({
  user:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  date: Date,
  important: Boolean
});


noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});


const Note = mongoose.model('Note', noteSchema);

const note = new Note({
  content: 'lleer irrn4r4n4 4rninieoeiremkewm',
  date: new Date(),
  important: true,
});

note.save().then(result => {
  console.log('note saved');
  mongoose.connection.close();
})
  .catch(err => {
    console.log(err);
  });