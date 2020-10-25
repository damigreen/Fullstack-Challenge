import React, { useState } from 'react';


const PhoneForm = (props) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')


  const submit = async (e) => {
    e.preventDefault();

    await props.editNumber({
      variables: { name, phone }
    });
    setName('');
    setPhone('');
  }

  return (
    <div>
      <h2>Change Number</h2>
      <form onSubmit={submit}>
        <div>
          <label for="Name">Name</label>
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label for="Number">Phone</label>
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <button type="submit">change number</button>
      </form>
    </div>
  )
}

export default PhoneForm;
