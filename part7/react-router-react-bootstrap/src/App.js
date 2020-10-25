import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import { Table, Form, Button, Alert, Nav, Navbar } from 'react-bootstrap';

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
    <Table striped hover>
      <tbody>
        {props.notes.map(note =>
          <tr key={note.id}>
            <td>
              <Link to={`/notes/${note.id}`}>
                {note.content}</Link>
            </td>
            <td>
              {note.user}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
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
    props.onLogin('mluukkai')
    props.history.push('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
          />
          <Button variants="primary" type="submit">
            login
          </Button>
        </Form.Group>
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

  const padding = { padding: 5 }

  return (
    <div class="container">
      <Router>
        <div>
          <div>
            {(message &&
              <Alert variant="success">
                {message}
              </Alert>
            )}

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#" as="span">
                    <Link to="/" style={padding}>home</Link> 
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link to="/notes" style={padding}>notes</Link> 
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link to="/users" style={padding}>users</Link> 
                    {user
                      ? <em>{user} logged in</em>
                      : <Link to="/login">login</Link>
                    }
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
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
        <em>Note app, Damilola Faseun</em>
      </div>
    </div>
  )
}

export default App