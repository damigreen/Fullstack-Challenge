const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// const Note = require('/models/note');


app.use(bodyParser.json());
app.use(cors());
app.use(express.static('build'));

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browsers can execute only javaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important method of HTTP protocol",
    important: true
  },
];

// const url = `mongodb+srv://damigreen:GQySLn0KwHAZct56@cluster0-9junr.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important:  Boolean,
});

// format object returned by mongoose
noteSchema.set('toJson', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.tostring();
    delete returnedObject._id;
    delete returnedObject._v;
  }
});

const Note = mongoose.model('Note', noteSchema);

// a middleware for printing the request parameters to the screen
const requestLogger = (req, res, next) => {
  console.log(`Method: ${req.method}`);
  console.log(`Path: ${req.path}`);
  console.log(`Body: ${req.body}`);
  next();
};
app.use(requestLogger);

app.put('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const note = notes.find(note => note.id == id);
  note.important = !note.important;
  res.json(note);
});

// generate id for the new note object to be returned the front end
const genetateId = () => {
  // generate id for the requested note 
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
  return  maxId + 1;
};

// the post request handlers
app.post('/api/notes', (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: "content missng"
    });
  }
  const note = {
    content: body.content,
    important: body.important || false,
    data: new Date(),
    id: genetateId()
  };
  notes = notes.concat(note);
  response.json(note);
});

// creating a route for the DELETE request for the id.
app.delete('api/notes/:id', (request, response) => {
  const id = request.params.id;
  notes = notes.filter(note => note.id !== id);
  
  response.status(202).end();
});

// creating a route for the GET request for the id.
// sends the note to the route with the request paramter id 
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  const note = notes.find(note => note.id == id);
  console.log(note.important);
    if (note) {
      response.json(note);
    } else 
      response.status(404).end();
});

app.get('/', (req, res) => {
  res.send('<h1>Hello, world</h1>');
});

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes.map(note => note.toJSON()));
  });
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({
    error: "unknown endpoint"
  });
};
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});