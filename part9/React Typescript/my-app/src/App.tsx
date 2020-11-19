import React from 'react';
interface WelcomeProps {
  name: string;
}

const Welcome: React.FC<WelcomeProps> = (props) => {
  return <h1>Hello, {props.name}</h1>;
};

function App() {
  return (
    <div className="App">
      <Welcome name="Sandra" />
    </div>
  );
}


// const element = <Welcome name="Sara" />;
// ReactDOM.render(element, document.getElementById("root"));

export default App;
