import React, { useState } from 'react'

function LoginForm(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    
    const result = await props.login({
      variables: { username, password }
    });

    if (result) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem('phonenumbers-user-token', token);
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label for="username">Username</label>
          <input
            value={username}
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            value={password}
            type="password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
