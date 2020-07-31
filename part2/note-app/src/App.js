import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import noteService from './services/notes';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import NoteForm from './components/NoteForm';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a1 damigreen note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);


  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes);
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const useR = JSON.parse(loggedUserJSON);
      setUser(useR);
      noteService.setToken(useR.token);
    }
  }, []);

  const toggleImportance = (id) => {
    const note = notes.find(no => no.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map(oldNotes => (oldNotes.id !== id ? oldNotes : returnedNote)));
      })
      .catch((err) => {
        setErrorMessage(`Note ${note.content} was already removed from the server ${err}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  const noteFormRef = React.createRef();

  const addNote = (event) => {
    event.preventDefault();
    noteFormRef.current.toggleVisibility();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      // important: Math.random() > 0.5,
      important: false
    };
    noteService
      .create(noteObject)
      .then((returnedNote) => {
          // registred event handlers logs the response from the server to the console
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      });
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const rows = () => notesToShow.map(
    note => (
        <Note
            key={note.id}
            note={note}
            // Notice how every note receives its own unique event handler function,
            // since the id of every note isunique
            toggleImportance={() => toggleImportance(note.id)} />
    ),
  );

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log(`logging in with ${username}, ${password}`);
    try {
      const useR = await loginService.login({
        username, password,
      });
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(useR));
      noteService.setToken(useR.token);
      setUser(useR);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    const showWhenVisible = { display: loginVisible ? 'none' : '' };
    const hideWhenVisible = { display: loginVisible ? '' : 'none' };

    return (
        <div>
            <div style={showWhenVisible}>
                <button onClick={() => setLoginVisible(true)}>log in</button>
            </div>
            <div style={hideWhenVisible}>
                <LoginForm
                    username={username}
                    pssword={password}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    handleSubmit={handleLogin} />
                <button onClick={() => setLoginVisible(false)}>cancel</button>
            </div>
        </div>
    );
  };

  return (
      <div>
          <h1>Notes</h1>
          <Notification
              message={errorMessage} />
          <h2>Login</h2>
          { user === null ? loginForm() :
          <div>
              <p>{user.name} logged in</p>
              <Togglable buttonLabel="new note" ref={noteFormRef}>
                  <NoteForm
                      onSubmit={addNote}
                      value={newNote}
                      handleChange={handleNoteChange} />
              </Togglable>
          </div>
          }
          <div>
              <button onClick={() => setShowAll(!showAll)}>
                  show {showAll ? 'important' : 'all'}
              </button>
          </div>
          <ul>
              {rows()}
          </ul>
          <Footer />
      </div>
  );
};

export default App;
