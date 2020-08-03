import React, { useState } from 'react';
import './App.css';

function App(props) {
  const counter = useCounter();
  const left = useCounter();
  const right = useCounter();
  const name = useField('text');
  const born = useField('date');
  const heigth = useField('number');

  return (
    <div className="App">
      <div>{counter.value}</div>
      <button onClick={counter.increase}>
        plus
      </button>
      <button onClick={counter.decrease}>
        minus
      </button>
      <button onClick={counter.zero}>
        zero
      </button>
      <div>
        {left.value}
        <button onClick={left.increase}>
          left
        </button>
        <button onClick={right.increase}>
          right
        </button>
        {right.value}
      </div>
      <br />

      <div>
        <form>
          name:
          <input {...name} /> <br/>
          birthdate:
          <input {...born} /> <br/>
          heigth:
          <input {...heigth} /> <br/>
        </form>
        <div>
          {name.value} {born.value} {heigth.value}
        </div>
      </div>
    </div>
  );
}

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  }

  return {
    type,
    value,
    onChange
  }
}

const useCounter = () => {
  const [value, setValue] = useState(0);

  const increase = () => {
    setValue(value + 1)
  }
  const decrease = () => {
    setValue(value - 1)
  }
  const zero = () => {
    setValue(value - 1)
  }
  return {
    value,
    increase,
    decrease,
    zero
  }
}

export default App;
