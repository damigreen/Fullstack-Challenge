
/*
*1(c) Component state , event handlers


*Page re-rendering
So far all of our applications have been such that their appearance remains the same after the initialrendering. What if we wanted to create a counter where the value increased as a function of time orat the click of a button
*Stateful Component

In the rst row, the application imports the useState-function:
import React useState from'react'
The function body that denes the component begins with the function call:
const counter setCounter =useState(0)
*/


/* 
*code
 */

import React, { useState } from 'react';
import ReactDom from "react-dom";
import { tsPropertySignature } from '@babel/types';

/*
*Destructuring
we will take a look at a small but useful feature of the JavaScript languagethat was added in the ES6 specication, that allows us to destructure values from objects andarrays upon assignment

*helper functions
const Hello = (props) => {
  // const name = props.name;
  // const age = props.age;

  // const { name, age } = props;

  const born_year = () => new Date().getFullYear() - age;
  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you are probably born in {born_year()}</p>
    </div>
  );
};
 */


/* 
*Destructing
const Hello = ({name, age}) => {
 const born_year = () => new Date().getFullYear() - age;

 return (
   <div>
     <p>
       Hello {name}, you are {age} years old
     </p>
     <p>So you are probably born in {born_year()}</p>
   </div>
 );
}
*/

/* 
*app destructing
const App = () => {
  const name = 'James';
  const age= 12;

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Maya' age={12+4} />
      <Hello name={name} age={age} />
    </div>
  );
};

ReactDom.render(<App />, document.getElementById('root'));
*/

/* 
 *page re-rendering
const App = (props) => {
  const {counter} = props;
  return (
    <div>{counter}</div>
  );
};

let counter = 1;

// refresh funcion helps to cut down on the copy and past codes
const refresh = () => {
  ReactDom.render(<App counter={counter} />, document.getElementById('root'));
}

refresh();
counter += 1;
refresh();
counter += 1;
refresh();
counter += 1
refresh();
counter += 1

re-rendering and incrementing using setInterval
setInterval(() => {
  refresh();
  counter +=1;
}, 1000);
 */

/* 
*Stateful component
// the component function. re-renders the component
const App = (props) => {
  const [ counter, set_counter ] = useState(0); //the counter variabe is assigned the initial value stae which is zero

  setTimeout(
    // state modifying function
    () => set_counter(counter + 1), 
    1000
  );
  
  console.log('rendering...', counter);

  return (
    <div>{counter}</div>
  )
};

ReactDom.render(<App />,document.getElementById('root'));

*/


/* 
*event handling
a user's interaction with the different elements of a web page cancause a collection of various different kinds of events to be triggered

we achieve the desired behavior, meaning that the value of counter is increased by one and thecomponent gets re-rendered

const App = (props) => {
  const [ counter, set_counter ] = useState(0);

  const increase_by_one = () => 
    set_counter(counter + 1);

  const set_to_zero = () =>
    set_counter(0);

  return (
      <div>
      <div>{counter}</div>
      <button onClick={increase_by_one}>
        plus
      </button>
      <button onClick={set_to_zero}>
        Zero
      </button>
    </div>
  );

///////////////////////////////////////////////////////////////////////
*Event handlers are functions
  const [ counter, set_counter ] = useState(0);

  const set_to_value = (value) => set_counter(value);

  return (
    <div>
      <button onclick={set_to_value(counter + 1)}>
        plus
      </button>
      <button onClick={set_to_value(0)}>
        zero
      </button>
    </div>
  );


// ////////////////////////////////////////////////////////////////////////
// 

const [ counter, set_counter ] = useState(0);

const set_to_value = (value) => set_counter(value);

return (
  <div>
    <div>{counter}</div>
    <button onClick={() => set_to_value(counter + 1)}>
      plus
    </button>
    <button onClick={() => set_to_value(0)}>
      zero
    </button>
  </div>
);


// ////////////////////////////////////////////////////////////////////////

 *Event Handlers are functions
// Double arrow functions can be thought of as functions that have to be called twice in order to getthe nal result

const [counter, set_counter] = useState(0);

const set_to_value = (value) => () => set_counter(value);

return (
  <div>
    <div>{counter}</div>
    <button onClick={set_to_value(counter + 1)}>
      plus
    </button>
    <button onClick={set_to_value(0)}>
      zero
    </button>
  </div>
);



};

ReactDom.render(<App />,document.getElementById('root'));

*/


//////////////////////////////////////////////////////////////////////////////////
/*
 *Passing state to child components

It's recommended to write React components that are small and reusable across the applicationand even across projects.
Let's refactor our application so that it's composed of three smallercomponents, one component for displaying the counter and two components for buttons
 */
//*Display component function
// const Display = (props) => {
//   return (
//     <div>{props.counter}</div>
//   );
// };

// further using destruction on the component function parameter
// const Display = ({counter}) => {
//   return (
//     <div>
//       {counter}
//     </div>
//   )
// }

// Using cmpact syntax for arrow function
const Display = ({counter}) => <div>{counter}</div>

// const App = () => {
//   const  [counter, set_counter] = useState(0);
//   const set_to_value = (value) => () => set_counter(value);

//   return (
//     <div>
//       <Display counter={counter} />

//       <button onClick={set_to_value(counter+1)}>
//         plus
//       </button>

//       <button onClick={set_to_value(0)}>
//         zero
//       </button>
//     </div>
//   );
// };

// *Buttons component function
// const Button = () => {
//   <button onClick={props.onClick}>
//     {props.text}
  // </button>
// }

// using destrution on the button component function
const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  const  [counter, set_counter] = useState(0);
  const set_to_value = (value) => () => set_counter(value);

  return (
    <>
      <Display counter={counter} />

      <Button onClick={set_to_value(counter+1)} text='plus' />
      
      <Button onClick={set_to_value(counter-1)} text='miNus' />

      <Button onClick={set_to_value(0)} text='zero' />
    </>
  );
};

ReactDom.render(<App />, document.getElementById('root'));