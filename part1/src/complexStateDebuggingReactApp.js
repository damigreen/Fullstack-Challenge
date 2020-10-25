
/* 
*17:10:19
*(d) A more complex state, debugging React apps

*complex state
What if our application requires a more complex state? In most cases the easiest and best way to accomplish this is by using the useState functionmultiple times to create separate "pieces" of state.
*/

// * code


import React, { useState } from 'react';
import ReactDom from 'react-dom';

// const App = (props) => {
//   const [left, set_left] = useState(0)
//   const [right, set_right] = useState(0)

//   return (
//     <div>
//       <div>
//         {left}
//         <button onClick={() => set_left(left + 1)} >
//           left
//         </button>
//         <button onClick={() => set_right(right + 1)}>
//           right
//         </button>
//         {right}
//       </div>
//     </div>
//   );
// };

// *using a single object for the states
// const App = (props) => {
//   const [clicks, set_clicks] = useState({
//     left: 0,
//     right: 0
//   });

//   const handle_left_click = () => {
//     const new_clicks = {
//       left: clicks.left + 1,
//       right: clicks.right
//     };
//     set_clicks(new_clicks);
//   };
  
//   const handle_right_click = () => {
//     const new_clicks = {
//       left: clicks.left,
//       right:clicks.right + 1
//     };
//     set_clicks(new_clicks);
//   };
  
//   return (
//     <div>
//       <div>
//         {clicks.left}
//         <button onClick={handle_left_click}>Left</button>
//         <button onClick={handle_right_click}>Right</button>
//         {clicks.right}
//       </div>
//     </div>
//   );
  
// };

// ReactDom.render(<App />, document.getElementById('root'));

// *defining the new states of the object using the object spread syntax
//
// The syntax may seem a bit strange at rst. In practice { ...clicks } creates a new object thathas copies of all of the properties of the clicks object.

// 

// const App = (props) => {
//   const [clicks, set_clicks] = useState({
//     left: 0,
//     right: 0
//   });

//   // const handle_left_click =() => {
//   //   const new_clicks = {
//   //     ...clicks,
//   //     left: clicks.left + 1
//   //   };
//   //   set_clicks(new_clicks)
//   // };

//   // const handle_right_click = () => {
//   //   const new_clicks = {
//   //     ...clicks,
//   //     right: clicks.right +1
//   //   };
//   //   set_clicks(new_clicks);
//   // };

//   // Assigning the object to a variable in the event handlers is not necessary and we can simplify thefunctions to the following form:
//   const handle_left_click = () => set_clicks({...clicks, left: clicks.left + 1 });

//   const handle_right_click = () => set_clicks({...clicks, right: clicks.right + 1});

  

//   return (
//     <div>
//       <div>
//         {clicks.left}
//         <button onClick={handle_left_click}>Left</button>
//         <button onClick={handle_right_click}>Right</button>
//         {clicks.right}
//       </div>
//     </div>
//   );
  
// };

// ReactDom.render(<App />, document.getElementById('root'));

// *Handling arrays
// const App = (props) => {
//   const [left, set_left] = useState(0);
//   const [right, set_right] = useState(0);
//   const [all_clicks, set_all] = useState([]);

//   const handle_left_click = () => {
//     // set_all(all_clicks.concat('L'));
//     all_clicks.push('L');
//     set_all(all_clicks);
//     set_left(left + 1)
//   };

//   const handle_right_click = () => {
//     set_all(all_clicks.concat('R')); // prefered
//     // all_clicks.push('R');
//     // set_all(all_clicks);
//     set_right(right + 1);
//   };
  
//   return (
//     <div>
//       <div>
//         {left}
//         <button onClick={handle_left_click}>Left</button>
//         <button onClick={handle_right_click}>Right</button>
//         {right}
//         <p>{all_clicks.join(' ')}</p>
//       </div>
//     </div>
//   );
// };

// ReactDom.render(<App />, document.getElementById('root'));


// *modify
// *Conditional rendering
// 
// Let's modify our application so that the rendering of the clicking history is handled by a new History component:
// 
// The History component renders completely different React-elements depending on the state of theapplication. This is called conditional rendering
// 
// React also offers many other ways of doing conditional rendering.
// 

//   const History = ({all_clicks}) => {
//     if (all_clicks.length === 0) {
//       return (
//         <div>
//           you use the app by pressing the buttons
//         </div>
//       );
//     };
  
//     return (
//       <div>
//         button press history: {all_clicks.join(' ')}
//       </div>
//     );
//   };
// const App = (props) => {
//   const [left, set_left] = useState(0);
//   const [right, set_right] = useState(0);
//   const [all_clicks, set_all] = useState([]);

//   const handle_left_click = () => {
//     set_all(all_clicks.concat('L'));
//     set_left(left + 1)
//   };
    
//   const handle_right_click = () => {
//     set_all(all_clicks.concat('R'));
//     set_right(right + 1);
//   };
      
//   return (
//     <div>
//       <div>
//         {left}
//         <button onClick={handle_left_click}>Left</button>
//         <button onClick={handle_right_click}>Right</button>
//          {right}
//         <History all_clicks={all_clicks} />
//       </div>
//     </div>
//   );

// };

// ReactDom.render(<App />, document.getElementById('root'));

// *Modification
// 
// Let's make one last modication to our application by refactoring it to use the Button component.

// const History = ({all_clicks}) => {
//   if (all_clicks === 0) {
//     return (
//       <dv>
//         the app is used by pressing the buttons
//       </dv>
//     );
//   };

//   return (
//     <div>
//       Button press history: {all_clicks.join(' ')}
//     </div>
//   )
// };

// const Button = ({ on_click, text }) => (
//   <button onClick={on_click}>
//      {text} 
//   </button>
// );

// const App = (props) => {
//   console.log(props)
//   const [left, set_left] = useState(0);
//   const [right, set_right] = useState(0);
//   const [all_clicks, set_all] = useState([]);

//   const handle_left_click = () => {
//     set_all(all_clicks.concat('L'));
//     set_left(left + 1)
//   };
    
//   const handle_right_click = () => {
//     set_all(all_clicks.concat('R'));
//     set_right(right + 1);
//   };
      
//   return (
//     <div>
//       <div>
//         {left}
//         <Button on_click={handle_left_click} text='left' />
//         <Button on_click={handle_right_click} text='right' />
//           {right}
//         <History all_clicks={all_clicks} />
//       </div>
//     </div>
//   );
// };
  
//   ReactDom.render(<App />, document.getElementById('root'));


////////////////////////////////////////////////////////////////////////////////////////


// *Old React
// In this course we use the state hook to add state to our React components, which is part of thenewer versions of React and is available from version 16.8.0 onwards. Before the addition of hooks,there was no way to add state to React functional components. Components that required state hadto be dened as React class components using the JavaScript class syntax.In this course we have made the slightly radical decision to use hooks exclusively from day one, toensure that we are learning the future style of React. Even though functional components are thefuture of React, it is still important to learn the class syntax, as there are billions of lines of old Reactcode that you might end up maintaining some day. The same applies to documentation andexamples of React that you may stumble across on the internet.

// *Debugging React applications
// he first rule of web developmentKeep the browser's developer console open at all times.

// The Console tab in particular should always be open, unless there is a specic reason to viewanother tab.Keep both your code and the web page open together at the same time, all the time

// NB when you use console.log for debugging, don't combine objects in a Java-like fashion byusing a plus. Instead use a comma

// Logging to the console is by no means the only way of debugging our applications. You can pausethe execution of your application code in the Chrome developer console's debugger, by writing thecommand debugger anywhere in your code

// he execution will pause once it arrives at a point where the debugger command gets execute

// Once the cause of the bug is discovered you can remove the debugger command and refresh thepage.

// The debugger also enables us to execute our code line by line with the controls found in the right-hand side of the Source tab.

// You can also access the debugger without the debugger command by adding break points in theSources tab. Inspecting the values of the component's variables can be done in the Scope-section:


// *Rules of Hooks

// There are a few limitations and rules we have to follow to ensure that our application uses hooks-based state functions correctly.

// The useState function (as well as the useEffect function)must not be called from inside of a loop, a conditional expression, or any place that is not a functiondening a component. This must be done to ensure that the hooks are always called in the sameorder, and if this isn't the case the application will behave erratically


// *Event Handling Revisited

// In order to make the button react to a click event, we have to add an event handler to it.

// Event handlers must always be a function or a reference to a function. 

// The button will not work ifthe event handler is set to a variable of any other type

// The event handler is not a function but a variable assignment,

// Functions returning functions can be utilized in dening generic functionality that can becustomized with parameters.

// Choosing between the two presented ways of dening your event handlers is mostly a matter oftaste


// const App = (props) => {
//   const [value, set_value] = useState(4000000000000);

//   // const set_to_value = (new_value) => () => {
//   //   set_value(new_value);
//   // }
  
//   // const hello = (who) => {
//     //   return () => console.log('hello', who);
//     // };

//   const set_to_value = (new_value) => set_value(new_value);

//   const hello = (who) => () => {
//     console.log('hello', who);
//   };

//   return (
//     <div>
//       <button onClick={() => set_to_value(0)}>reset to zero</button>
//       {value}
//       <button onClick={() => set_to_value(4)}>reset to four</button>
//       <button onClick={() => set_to_value(value + 1)}>increment</button><br /><br />
//       <button onClick={hello('damigreen')}>button</button><br />
//       <button onClick={hello('world')}>button</button><br />
//       <button onClick={hello('react')}>button</button><br />
//       <button onClick={hello('function')}>button</button><br />
//     </div>
//   );
// };

// ReactDom.render(<App />,
//    document.getElementById('root')
// );


// *Passing Event Handlers to Child Component

// extract the button into its own component

// Never define components inside of other components. 

const Button = (props) => (
  <button onClick={props.set_to_value}>
    {props.text}
  </button>
);

const Display = ({value}) => (
  <div>
    {value}
  </div>
)
const App = (props) => {
  const [value, set_value] = useState(4000000000000);

  const set_to_value = (new_value) => set_value(new_value);

  const hello = (who) => () => {
    console.log('hello', who);
  };

  return (
    <div>
      <Button set_to_value={() => set_to_value(value + 1)} text='increment' />

      <Display value={value} />

      <Button set_to_value={() => set_to_value(value - 1)} text='decrement' />

      <Button set_to_value={() => set_to_value(0)} text='reset to zero' /><br /><br />

      <button onClick={hello('damigreen')}>button</button><br />
      <button onClick={hello('world')}>button</button><br />
      <button onClick={hello('react')}>button</button><br />
      <button onClick={hello('function')}>button</button><br />
    </div>
  );
};

ReactDom.render(<App />,
   document.getElementById('root')
);














