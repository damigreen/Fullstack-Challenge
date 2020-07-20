
/* 
*(b) Intro to react
 */
import React from 'react';
import ReactDOM from 'react-dom';

const Part = (props) => {
  console.log(props);
  return (
    <div>
      <p>{props.part} has {props.exercise} points each</p>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <p>The name of these course is {props.course}</p>
    </div>
  )
};

const Content = (props) => {
  return (
    <div>
      <p>
      {props.part1} and its exercise has a total score of {props.exercise1}
      </p>
      <p>
      {props.part2} and its exercise has a total score of {props.exercise2}
      </p>
      <p>
      {props.part3} and its exercise has a total score of {props.exercise3}
      </p>
    </div>
  )
}

const Total = (props) => {
  console.log(props);
  return (
    <div>
      <p>The total number of exercises are {props.exercise1+props.exercise2+props.exercise3+4} <b>Note: </b>the number four(4) has been added</p>
    </div>
  )

}

const HelloProps = (props) => {
  const passcode = 'height';

  return (
    <div>
      <p>
        Hello, {props.name}, your order for the reefer KZ is now avvailable please supply your {passcode} to reeive your order. Also, you are {props.age} years old
      </p>
    </div>
  )
};

const Welc = (props) => {
  return (
    <div>
      <p>You are welcome here {props.name}</p>
    </div>
  );
};

const Hello = () => {
  return(
    <div>
      <p>Hello, world</p>
    </div>
  )
}

const AddAb = () => {
  const now = new Date();
  const a = 10;
  const b = 20
  
  return (
    <div>
      <h1>Greetings</h1>
        <p>It is {now.toString()}</p>
        <p>
          {a} + {b} is {a + b}
        </p>
    </div>
  )
};


/* 
*Exerises
*course information
*/

/* 
*1.3: course information step3
  const age = '23';

  const course = 'Half Stack Application Development';

  const part_1 = {
    name: 'Fundamentals of React',
    exercises: 10
  };
  const part_2 = {
    name:'Using props to pass data',
    exercises: 7
  };
  const part_3 = {
    name: 'State of a Component',
    exercises: 14
  }

  console.log('Hello from damigreen')
  return (
  <>
    <AddAb />
    <br />
  
    <Hello />
    <Hello />
    <br />
  
    <Welc name="damigreen" />
    <Welc name="George Daisy" />

    <div>
      <h3>to our customers</h3>
      <HelloProps name="Maya" age={8+3} />
      <HelloProps name={name} age={age} />
    </div>

    <h1>Exercises part A</h1>
    <div>
      <h2>{course}</h2>
      <p>
        {part_1.name} {part_1.exercises}
      </p>
      <p>
        {part_2.nme} {part_2.exercises}
      </p>
      <p>
        {part_3.name} {part_3.exercises}
      </p>
      <p>
        Number of exercises {part_1.exercises + part_2.exercises+part_3.exercises}
      </p>
    </div>

    <h2>Courses Classification [Content]</h2>
      <h3>These part of the course is divided into</h3>
      <div>
        <Header course={course} />
      </div>

      <div>
        <Content part1={part_1.name} exercise1={part_1.exercises} part2={part_2.name} exercise2={part_2.exercises} part3={part_3.name} exercise3={part_3.exercises} /> 
      </div> 

      <h3>Sum of the exercise [Total]</h3>
      <div>
        <Total exercise1={part_1.exercises} exercise2={part_2.exercises} exercise3={part_3.exercises} />
      </div>

      <h3>Division of sections into parts [Part]</h3>
      <div>
        <Part part={part_1.name} exercise={part_1.exercises} />
        <Part part={part_2.name} exercise={part_2.exercises} />
        <Part part={part_3.name} exercise={part_3.exercises} />
      </div>
  </>
  )

};

ReactDOM.render(<App />, document.getElementById('root'));
*/


/* 
*1.4: course information step4

const App = () => {
  const name = 'peter';
  const age = '23';
 
  const course = 'Half Stack Application Development';

  const parts =[
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name:'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a Component',
      exercises: 14
    }
  ];

  return (
  <>
  <AddAb />
    <br />
  
    <Hello />
    <Hello />
    <br />
  
    <Welc name="damigreen" />
    <Welc name="George Daisy" />

    <div>
      <h3>to our customers</h3>
      <HelloProps name="Maya" age={8+3} />
      <HelloProps name={name} age={age} />
    </div>

    <h1>Exercises part A</h1>
    <div>
      <h2>{course}</h2>
      <p>
        {parts[0].name} {parts[0].exercises}
      </p>
      <p>
        {parts[1].name} {parts[1].exercises}
      </p>
      <p>
        {parts[2].name} {parts[2].exercises}
      </p>
      <p>
        Number of exercises {parts[0].exercises + parts[1].exercises+parts[2].exercises}
      </p>
    </div>

    <h2>Courses Classification [Content]</h2>
      <h3>These part of the course is divided into</h3>
      <div>
        <Header course={course} />
      </div>

      <div>
        <Content part1={parts[0].name} exercise1={parts[0].exercises} part2={parts[1].name} exercise2={parts[1].exercises} part3={parts[2]['name']} exercise3={parts[2]['exercises']} /> 
      </div> 

      <h3>Sum of the exercise [Total]</h3>
      <div>
        <Total exercise1={parts[0].exercises} exercise2={parts[1].exercises} exercise3={parts[2]['exercises']} />
      </div>

      <h3>Division of sections into parts [Part]</h3>
      <div>
        <Part part={parts[0].name} exercise={parts[0].exercises} />
        <Part part={parts[1].name} exercise={parts[1].exercises} />
        <Part part={parts[2].name} exercise={parts[2].exercises} />
      </div>
  </>
  )

};

ReactDOM.render(<App />, document.getElementById('root'));
 */


// * 1.5: course information step4
  const App = () =>{
  const name = 'peter';
  const age = '23';
 
  const course = {
    name: 'Half Stack Application Development',

    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name:'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a Component',
        exercises: 14
      }
    ]
  }

  return (
  <>
    <AddAb />
    <br />
  
    <Hello />
    <Hello />
    <br />
  
    <Welc name="damigreen" />
    <Welc name="George Daisy" />

    <div>
      <h3>to our customers</h3>
      <HelloProps name="Maya" age={8+3} />
      <HelloProps name={name} age={age} />
    </div>

    <h1>Exercises part A</h1>
    <div>
      <h2>{course.name}</h2>
      <p>
        {course.parts[0].name} {course.parts[0].exercises}
      </p>
      <p>
        {course.parts[1].name} {course.parts[1].exercises}
      </p>
      <p>
        {course.parts[2].name} {course.parts[2].exercises}
      </p>
      <p>
        Number of exercises {course.parts[0].exercises + course.parts[1].exercises+course.parts[2].exercises}
      </p>
    </div>

    <h2>Courses Classification [Content]</h2>
      <h3>These part of the course is divided into</h3>
      <div>
        <Header course={course.name} />
      </div>

      <div>
        <Content part1={course.parts[0].name} exercise1={course.parts[0].exercises} part2={course.parts[1].name} exercise2={course.parts[1].exercises} part3={course.parts[0].name} exercise3={course.parts[2]['exercises']} /> 
      </div> 

      <h3>Sum of the exercise [Total]</h3>
      <div>
        <Total exercise1={course.parts[0].exercises} exercise2={course.parts[1].exercises} exercise3={course.parts[2]['exercises']} />
      </div>

      <h3>Division of sections into parts [Part]</h3>
      <div>
        <Part part={course.parts[0].name} exercise={course.parts[0].exercises} />
        <Part part={course.parts[1].name} exercise={course.parts[1].exercises} />
        <Part part={course.parts[2].name} exercise={course.parts[2].exercises} />
      </div>
  </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));




/* 
* *******************************************************************************************************
*/























