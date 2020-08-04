import React from 'react'
import { connect } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NewNote = (props) => {
  console.log(createNote)
  console.log(props.createNote)

  const  addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    props.createNote(content)
    event.target.note.value = '';
    
    console.log('add note:---')
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    createNote: value => {
      dispatch(createNote(value))
    }
  }
}

// export default connect(
//   null,
//   { createNote }
// )(NewNote)

export default connect(
  null,
  mapDispatchToProps
)(NewNote)
