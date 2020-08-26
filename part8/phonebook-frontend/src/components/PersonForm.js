import React, { useState } from 'react';


const PersonForm = (props) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await props.addUser({
        variables: { name, phone, street, city }
      });
  
      setName('');
      setPhone('');
      setStreet('');
      setCity('');

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={submit} >
        <div>
          <label for="Name">Name</label>
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label for="phone">Phone</label>
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          <label for="street">Street</label>
          <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          <label for="city">City</label>
          <input
            value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type="submit">add!</button>
      </form>
    </div>
  )
}

export default PersonForm
