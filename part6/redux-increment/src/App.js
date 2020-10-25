import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';


const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default: 
    return state;
  }
}

const store = createStore(counterReducer);
// console.log(store.getState());
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })
// console.log(store.getState());
// store.dispatch({ type: 'DECREMENT' })
// console.log(store.getState());


function App() {
  return (
    <div className="App">
      <div>
        {store.getState()}
      </div>
      <button onClick={e => store.dispatch({ type: 'INCREMENT' })}>plus</button>
      <button onClick={e => store.dispatch({ type: 'DECREMENT' })}>minus</button>
      <button onClick={e => store.dispatch({ type: 'ZERO' })}>zero</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));


const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp()
store.subscribe(renderApp);

export default App;
