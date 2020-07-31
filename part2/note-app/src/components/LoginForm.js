import React from 'react';
import propTypes from 'prop-types';

const LoginForm = ({
      handleSubmit,
      handleUsernameChange,
      handlePasswordChange,
      username,
      password,
    }) => (
        <form onSubmit={handleSubmit}>
            <div>
                username
                <input
                    id="username"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={handleUsernameChange} />
            </div>
            <div>
                password
                <input
                    id="password"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={handlePasswordChange} />
            </div>
            <button type="submit">login</button>
        </form>
      );

LoginForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  handleUsernameChange: propTypes.func.isRequired,
  handlePasswordChange: propTypes.func.isRequired,
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
};

export default LoginForm;
