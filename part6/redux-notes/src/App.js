import React from 'react';
import './App.css';
import { createStore } from 'redux';
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer);

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
});

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
});

let generateId = () => {
  return Math.floor((Math.random() * 1000000));
};

function App() {

  const  addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    store.dispatch({
      type: 'NEW_NOTE',
      data: {
        content,
        important: false,
        id: generateId()
      }
    })
    console.log('add note:---')
    event.target.value = '';
  }

  const toggleImportance = (id) => {
    console.log('toggle:---')
    store.dispatch({
      type: 'TOGGLE_IMPORTANCE',
      data: { id }
    })
  }

  return (
    <div className="App">
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map(note =>
          <li key={note.id}
              onClick={toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? 'important' : ''} {console.log(store.getState())}</strong>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
