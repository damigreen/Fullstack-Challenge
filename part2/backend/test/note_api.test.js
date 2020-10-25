const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Note = require('../models/note');
const User = require('../models/user');

beforeEach(async () => {
  await Note.deleteMany({});
  console.log('cleared');

  // const noteObject = helper.initialNotes
  //   .map(note => new Note(note));
  // const promiseArray = noteObject.map(note => note.save());
  // await Promise.all(promiseArray);

  for (let note of helper.initialNotes) {
    let noteObject = new Note(note);
    await noteObject.save();
  }
});

// describe('when there is initially some notes saved', () => {
//   test('notes are returned as json', async () => {
//     await api
//       .get('/api/notes')
//       .expect(200)
//       .expect('Content-Type', /application\/json/);
//   });

//   test('all notes are returned', async () => {
//     const response = await api.get('/api/notes');
    
//     expect(response.body.length).toBe(helper.initialNotes.length);
//   });
  
//   test('the first note is about HTML', async () => {
//     const response = await api.get('/api/notes');
    
//     expect(response.body[0].content).toBe(helper.initialNotes[0].content);
//   });
  
//   test('a specific note is within the returned note', async () => {
//     const response = await api.get('/api/notes');
  
//     const contents = response.body.map(n => n.content);
  
//     expect(contents).toContain(
//       'Damigreen is green'
//     );
//   });
// });

// describe('viewing a specific note', () => {
//   test('succeeds with a valid id', async () =>  {
//     const noteAtStart = await helper.notesInDb();
  
//     const noteToView = noteAtStart[0];
  
//     const resultNote = await api
//       .get(`/api/notes/${noteToView.id}`)
//       .send(noteToView)
//       .expect(200) // FIX-201
//       .expect('Content-Type', /application\/json/);
  
//     expect(resultNote.body).toEqual(noteToView);
//   });

//   test('fails with a status code 404 if note does not exist', async () => {
//     const validNonExistingId = helper.nonExistingId();

//     console.log('------------------------------------------------------------');
//     console.log(validNonExistingId);

//     await api
//       .get(`/api/notes/${validNonExistingId}`)
//       .expect(400); // fix - 404
//   });

//   test('fails with a statuscode 400 id is invalid', async () => {
//     const invalidId = 'dhfe89hrheqwhfeuh0q830hrhq';

//     await api
//       .get(`/api/notes/${invalidId}`)
//       .expect(400);
//   });
// });

// describe('adding a new note', () => {
//   test('succeeds with a valid data', async () => {
//     const newNote = {
//       content: 'async/await simplifies making asynchronous calls',
//       important: true
//     };
  
//     await api
//       .post('/api/notes')
//       .send(newNote)
//       .expect(200)
//       .expect('Content-Type', /application\/json/);
  
//     // const response = await api.get('/api/notes');
//     const notesAtEnd = await helper.notesInDb();
  
//     const contents = notesAtEnd.map(r => r.content);
//     const notesLength  = notesAtEnd.length;
  
//     expect(notesLength).toBe(helper.initialNotes.length + 1);
//     expect(contents).toContain('async/await simplifies making asynchronous calls');

//   });
  
//   test('fails with status code 400 if data is invalid', async () => {
//     const newNote = {
//       important: true
//     };
  
//     await api
//       .post('/api/notes')
//       .send(newNote)
//       .expect(400);
  
//     const notesAtEnd = await helper.notesInDb();
  
//     expect(notesAtEnd.length).toBe(helper.initialNotes.length);
//   });
// });

// describe('deletion of a note', () => {
//   test('succeeds with a status code 204 if id is invalid', async () => {
//     const noteAtStart = await helper.notesInDb();
//     const noteToDelete = noteAtStart[1];
    
//     await api
//       .delete(`/api/notes/${noteToDelete.id}`)
//       .expect(204);
      
//     const notesAtEnd = await helper.notesInDb();
//     const contents = notesAtEnd.map(c => c.content);
    
//     expect(notesAtEnd.length).toBe(helper.initialNotes.length - 1);
//     expect(contents).not.toContain(noteToDelete);
//   });
// });


describe('when there is initiall one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ 
      username: 'root', 
      name: 'pscho', 
      password: 'secret' 
    });
    await user.save();
    
  });

  test('creation succeeds with a fresh username',  async() => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'damigreen',
      name: 'damilola Faseun',
      password: 'pirieruehadfadfd'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      
      .expect('Content-Type', /application\/json/);

    const userAtEnd = await helper.usersInDb();
    expect(userAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = userAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });
  
  test('creation with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'superuser',
      password: 'dfhdhfjdf9238940839'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    // expect(result.body.error).toContain('`username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    console.log(usersAtEnd);
    console.log(result.body);
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});