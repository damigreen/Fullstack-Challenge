const Note = require('../models/note');
const User = require('../models/user');

const initialNotes = [
  {
    content: 'html is easy',
    date: new Date(),
    important: false
  },
  
  {
    content: 'Browsers can execute only javascript',
    date: new Date(),
    important: false
  },
  {
    content: 'Damigreen is green',
    date: new Date(),
    important: true
  }
];

const nonExistingId = async () => {
  const note = new Note({ content: 'will remove this soon', date: new Date() });
  await note.save();
  await note.remove();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map(note => note.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb
};