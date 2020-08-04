import React from 'react'
import { connect } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import Note from './Note'

const Notes = (props) => {
  console.log(props)
  
  return (
    <ul>
      {props.visibleNotes.map(note => (
        <Note 
          key={note.id}
          note={note}
          handleClick={() => props.toggleImportanceOf(note.id)} />
      ))}
    </ul>
  )
}

const notesToShow = ({ notes, filter}) => {
  if (filter === 'ALL') {
    return notes
  }
  return filter === 'IMPORTANT'
    ? notes.filter(note => note.important)
    : notes.filter(note => !note.important)
}


const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    filter: state.filter,
    visibleNotes: notesToShow(state)
  }
}

const  mapDispatchToProps = {
  toggleImportanceOf
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes)
