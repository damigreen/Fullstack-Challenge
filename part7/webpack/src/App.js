import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useNotes = (url) => {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    axios.get(url).then(response => {
      setNotes(response.data)
    })
  }, [url])
  return notes
}

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([])
  const url = 'http://localhost:3001/notes'
  const notes = useNotes(BACKEND_URL)

  const handleClick = () => {
    setCounter(counter + 1)
    setValues(values.concat(counter))
  }
  
  return (
    <div className="container">
      <button onClick={() => setCounter(0)}>reset</button>
      Hello webpack {counter} clicks
      <button onClick={handleClick} >press</button>
      <div>There are {notes.length} notes on the server {BACKEND_URL}</div>
    </div>
  )
}

export default App
