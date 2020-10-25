import React, { useState, useImperativeHandle } from 'react';
import propTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? 'none' : '' };
  const hideWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
      <div>
          <div style={showWhenVisible}>
              <button onClick={toggleVisibility}>{props.buttonLabel}</button>
          </div>
          <div style={hideWhenVisible} className="togglableContent">
              {props.children}
              <button onClick={toggleVisibility}>cancel</button>
          </div>
      </div>
  );
});

Togglable.propTypes = {
  buttonLabel: propTypes.string.isRequired,
}

Togglable.displayName = 'Togglable';

export default Togglable;
