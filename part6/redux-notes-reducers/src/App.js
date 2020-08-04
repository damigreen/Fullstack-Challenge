import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter';
import { initializeNotes } from './reducers/noteReducer'

function App(props) {
  console.log(props)
  
  useEffect(() => {
    props.initializeNotes()
  }, [])

  return (
    <div className="App">
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
}

export default connect(
  null,
  { initializeNotes }
)(App);
