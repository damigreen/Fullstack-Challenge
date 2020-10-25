import React from 'react';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italics',
    fontSize: 16,
  };

  return (
      <div style={footerStyle}>
          <br />
          <em>A Note app, by Faseun Damilola 2019</em>
      </div>
  );
};

export default Footer;
