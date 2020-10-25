const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');
const  jwt = require('jsonwebtoken');

notesRouter.get('/', async (request, response, next) => {
  try {
    const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
    response.json(notes.map(note => note.toJSON())); 
  } catch (exception) {
    next(exception);
  }
});
  
notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note) {
      response.json(note.toJSON());
    } else {
      response.status(404).end();
    }
  }
  catch(exception) {
    next(exception);
  }
});

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

notesRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const token = getTokenFrom(request);

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);
  
    const note = new Note({
      content: body.content,
      important: body.important === undefined ? false : body.important,
      date: new Date(),
      user: user._id
    });
    
    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();
    response.json(savedNote.toJSON());
  } catch (exception) {
    next(exception);
  }
});

notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch(exception) {
    next(exception);
  }
});

notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  try {
    const note = {
      content: body.content,
      important: body.important
    };
  
    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true });
    response.send(updatedNote.toJSON());
    
  }catch (excpeption) {
    next(excpeption);
  }
});

module.exports = notesRouter;