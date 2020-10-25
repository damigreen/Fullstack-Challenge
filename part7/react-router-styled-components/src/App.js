import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import styled from 'styled-components';

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate
`;

const Input = styled.input`
  margin: 0.25em;
`;

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`;

const Navigation = styled.div`
  background: Burlywood:
  padding:1em
`;

const Footer = styled.div`
  background: Chocolate;
  pading: 1em;
  margin-top: 1em;
`;

const Home = () => (
  <div>
    <h2>TKTL notes app</h2>

    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </div>
)

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Notes = (props) => (
  <div>
    <h2>Notes</h2>
    <ul>
        {props.notes.map(note => 
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}{note.user}</Link>
          </li> 
          )}
    </ul>
  </div>
)

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
)

let Login = (props) => {
  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('damigreen')
    props.history.push('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
      <div>
          username: 
          <Input />
        </div>
        <div>
          password: <input type='password' />
        </div>
        <Button type="submit">login</Button>
      </form>
    </div>
  )
}

Login = withRouter(Login)

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is cool',
      important: true,
      user: 'Dr. Cortex'
    },
    {
      id: 2,
      content: 'The browser can only execute javascript',
      important: false,
      user: 'damigreen'
    },
    {
      id: 3,
      content: 'The most important methods of the HTTP protocol are GET and POST',
      important: true,
      user: 'damilola faseun'
    }
  ])

  const padding = {
    padding: 5
  }

  const [user, setUser] = useState(null) 
  const [message, setMessage] = useState(null)

  const messageTimerTimeout = () => {
    setTimeout(() => setMessage(null), 5000);
  };

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    messageTimerTimeout()
  }

  const noteById = (id) =>
    notes.find(note => note.id === Number(id))


  return (
    <Page>
        {message}
        <Router>
          <div>
            <Navigation>
            <Link to="/" style={padding} >home</Link>
            <Link to="/notes" style={padding} >notes</Link> 
            <Link to="/users" style={padding} >users</Link> 
            {user
              ? <em>{user} logged in</em>
              : <Link to="/login">login</Link>
            }
            </Navigation>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/notes" render={() => <Notes notes={notes} />} />
            <Route exact path="/notes/:id" render={({ match }) =>
              <Note note={noteById(match.params.id)} />}
            />
            <Route path="/users" render={() =>
              user ? <Users /> : <Redirect to="/login" />
            } />
            <Route path="/login" render={() =>
              <Login onLogin={login} />}
            />
          </div>
        </Router>
        <div>
          <br />
          <Footer><em>Note app, Damilola Faseun</em></Footer>
        </div>
    </Page>
  )
}

export default App;
