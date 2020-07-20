# React

## part1 (b) : Intro to react

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

## part1 (a) : HTTP GET and Event Handlers

### HTTP GET

The server and the web browser communicate with each other using the HTTP protocol. The Network tab shows how the browser and the server communicate
the browser uses the browser header t0 render images correctyn the screen The server has formed this document somehow. The document can be a s t a t ic text le saved into the server's directory. The server can also form the HTML documents d y n a mic ally according to the application code, using, for example, data from a database.

In traditional web applications the browser is "dumb". It only fetches HTML data from the server, and all application logic is on the server
*Running application logic on the browser
using the xmlhttprequest

var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.responseText);
        console.log(data);
        
        var ul = documet.createElement('ul');
        ul.setAttribute('class', 'notes');
        
        data.forEach(function(note) {
          var li = document.createElement('li');
        
          ul.appendChild(li);
          li.appendChild(document.createTextNode(note.content));
        });
        
        document.getElementById('notes').appendChild(ul);
      }
    };

    xhttp.open('GET', '/data.json', true);
    xhttp.send();

### Event handlers and Callback functions

an e v e n t h a n dle r for event o n r e a d y s t a t e c h a n g e is dened for the xhttp object doing the request. When the state of the object changes, the browser calls the event handler function. The function code checks that the readyState equals 4 (which depicts the situation T h e o p e r a t io n is c o mple t e ) and that the HTTP status code of the response is 200.

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //
      }
};

### Document Object Model or DOM

We can think of HTML-pages as implicit tree structures. The same treelike structure can be seen on the console tab Elements.

Document Object Model, or DOM is an Application Programming Interface, (an A P I ), which enables programmatic modication of the ele me n t t r e e s corresponding to web-pages.
The JavaScript code introduced in the previous chapter used the DOM-API to add a list of notes to the page. The following code creates a new node to the variable ul , and adds some child nodes to it

    const data = JSON.parse(this.response);

    var ul = document.createElement('ul');

    data.forEach(function(note) {
      var li = document.createElement('li');

      ul.appendChild(li);
      li.appendChild(document.createTextNode(note.content));
    });

    // Finally, the tree branch of the ul variable is connected to its proper place in the HTML tree of the whole page:

    document.getElementById('notes').appendChild(ul);

### Manipulating the document-object from console

The topmost node of the DOM tree of a HTML document is called the document object. We can perform various operations on a web-page using the DOM-API. You can access the document object by typing document into the Console-tab:

    // Let's add a new note to the page from the console.
    // First, we'll get the list of notes from the page. The list is in the rst ul-element of the page:

    list = document.getElementsByTagName('ul')[0]

    // Then create a new li-element and add some text content to it:

    new_element = document.createElement('li');
    new_element.textContent = 'page manipulation from console is easy';

    list.appendChild(new_element);

### CSS

The h e a d element of the HTML code of the Notes page contains a link tag, which determines that the browser must fetch a CSS style sheet from the address main.css.

Cascading Style Sheets, or CSS, is a markup language used to determine the appearance of web applications.

HTML elements can also have other attributes than classes. The d iv element containing the notes has an id attribute. JavaScript code uses the id to nd the element.
The Ele me n t s tab of the console can be used to change the styles of the elements.
*Loading a page containing JavaScript - revised
The browser fetches the HTML code dening the content and the structure of the page from the server usng the HTTP GET request
Links in the HTML code cause the browser to also fetch the CSS style sheet ma in.c s s ...and a JavaScript code le ma in.js

The browser executes the JavaScript code. The code makes an HTTP GET request to the address <https://fullstack-exampleapp.herokuapp.com/data.json>, which returns the notes as JSON data. 
When the data has been fetched, the browser executes an e v e n t h a n dle r , which renders the notes to the page using the DOM-API.

### Forms and HTTP POST

The code on the server responsible for the POST request is simple (NB: this code is on the server, and not on the JavaScript code fetched by the browser):

    app.post('/new_note', (req, res) => {
      notes.push({
        content: req.body.note,
        date: new Date(),
      });
      return res.redirect('/notes');
    });
The server can access the data by accessing the req.body eld of the request object req . The Server creates a new note object, and adds it to an array called notes 

The Note objects have two elds: c o n t e n t containing the actual content of the note, and d a t e containing the date and time the note was created. The server does not save new notes to a database, so new notes disappear when Heroku restarts the service

### AJAX

AJAX (Asynchronous Javascript and XML) is a term introduced in February 2005 on the back of advancements in browser technology to describe a new revolutionary approach that enabled the fetching of content to webpages using JavaScript included within the HTML, without the need to rerender the page.

The Notes page uses AJAX to fetch the notes data. Submitting the form still uses the traditional mechanism of submitting web-forms.

### Single page app

In our example app, the home page works like a traditional web-page: All of the logic is on the server, and the browser only renders the HTML as instructed.
The Notes page gives some of the responsibility, generating the HTML code for existing notes, to the browser. The browser tackles this task by executing the JavaScript code it fetched from the server. The code fetches the notes from the server as JSON-data and adds HTML elements for displaying the notes to the page using the DOM-API. 

In recent years, the Single-page application (SPA) style of creating web-applications has emerged. SPA style websites don't fetch all of their pages separately from the server like our sample application does, but instead comprises of only one HTML page fetched from the server, the contents of which are manipulated with JavaScript that executes in the browser.

The Notes page of our application bears some resemblance to SPA-style apps, but it's not quite there yet. Even though the logic for rendering the notes is run on the browser, the page still uses the traditional way of adding new notes. The data is sent to the server with form submit, and the server instructs the browser to reload the Notes page with a r e d ir e c t .

At rst glance, the application looks exactly the same as the previous one. The HTML code is almost identical, but the JavaScript le is different ( s p a .js ) and there is a small change in how the form-tag is dened:

The SPA version of the app does not send the form data the traditional way, but instead uses the JavaScript code it fetched from the server.

    var form  = document.getElementById('note_form');
    form.onsubmit = function(e) {
      e.preventDefault();

      var note = {
        content: e.target.elements[0].value,
        date: new Date(),
      };

      notes.push(note);
      e.target.elements[0].value = '';
    };

The command `document.getElementById('notes_form')` instructs the code to fetch the form-element from the page, and to register an e v e n t h a n dle r to handle the form submit event. The event handler immediately calls the method e.preventDefault() to prevent the default handling of form submit. The default method would send the data to server and cause a redirect, which we don't want to happen.
Then the event handler creates a new note, adds it to the notes list with the command notes.push(note) , rerenders the note list on the page and sends the new note to the server. 

The code for sending the note to the server is as follows: 

    var send_to_server = function(note) {
      var xhttp_for_post = new XMLHttpRequest();
      // ...

      xhttp_for_post.open('POST', '/new_note_spa', true);
      xhttp_for_post.setRequestHeader( 
        'content-type', 'application/json'
      );
      xhttp_for_post.send(JSON.stringify(note));
    };
The code determines that the data is to be sent with an HTTP POST request and the data type is to be JSON. The data type is determined with a Co n t e n t - t y p e header. Then the data is sent as JSON string.

### Javascript-libraries

Instead of using JavaScript and the DOM-API only, different libraries containing tools that are easier to work with compared to the DOM-API are often used to manipulate pages. One of these libraries is the ever-so-popular JQuery.

The rise of the single page app brought several more "modern" ways of web development than JQuery. The favorite of the rst wave of developers was BackboneJS. After its launch in 2012, Google's AngularJS quickly became almost the de facto standard of modern web development.

However, the popularity of Angular plummeted after the Angular team announced in October 2014 that support for version 1 will end, and Angular 2 will not be backwards compatible with the rst version. Angular 2 and the newer versions have not gotten too warm of a welcome.

Currently the most popular tool for implementing the browser-side logic of web-applications is Facebook's React-library. During this course, we will get familiar with React and the Redux-library, which are frequently used together.

The status of React seems strong, but the world of JavaScript is ever changing. For example, recently a newcomer VueJS has been capturing some interest.

### Introducton to React

The easiest way to get started by far is using a tool called create-react-app. It is possible (but not necessary) to install c r e a t e - r e a c t - a p p on your machine if the n p m tool that was installed along with Node has a version number of at least 5.3 .
to create a new react app
    npx create-react-app `<app name>`
    cd part1
to run the  new app
    npm start

index.js
    import React from 'react';
    import ReactDom from 'react-dom'

    const app = () => (
      <div>
        <p>Hello, world</p>
      </div>
    );

    ReactDom.render(<app />, document.getElementById('root'));

### Component

The le in d e x.js now denes a React-component with the name A p p and the command on the nal line

    ReactDom.render(<app />, document.getElementById('root'));
renders its contents into the d iv -element, dened in the le p u blic / in d e x.h t ml , having the id value 'root'.

Any JavaScript code within the curly braces is evaluated and the result of this evaluation is embedded into the dened place in the HTML produced by the component.

    const App  = () => {
      console.log('Hello from damigreen');
      const now = new Date();
      const a = 10;
      const b = 20


      return (
        <div>
          <p>Hello, world, It is {now.toString()}</p>
          <p>
            {a} + {b} is {a + b}
          </p>
        </div>
      );
    };

### JSX

It seems like React components are returning HTML markup. However, this is not the case. The layout of React components is mostly written using JSX. Although JSX looks like HTML, we are actually dealing with a way to write JavaScript. Under the hood, JSX returned by React components is compiled into JavaScript.

In practice, JSX is much like HTML with the distinction that with JSX you can easily embed dynamic content by writing appropriate JavaScript within curly braces. The idea of JSX is quite similar to many templating languages, such as Thymeleaf used along Java Spring, which are used on servers.

JSX is "XML-like", which means that every tag needs to be closed. For example, a newline is an empty element, which in HTML can be written as follows:
    `<br>`
but when writing  JSX, the tag needs tto be closed
   `<br />`

### Multiple components

We have dened a new component H ello and used it inside the component A p p . Naturally, a component can be used multiple times:

    const App  = () => {

      return (
        <div>
          <h1>Greetings</h1>
            <br />
            <Hello />
            <Hello />
        </div>
        )
    };

by combining components, even a more complex application can be kept fairly maintainable.

Another strong convention is the idea of a r o o t c o mp o n e n t called A p p at the top of the component tree of the application

Nevertheless, there are situations where the component A p p is not exactly the root, but is wrapped within an appropriate utility component.

props: passing data to components
It is possible to pass data to components using so called props

    const Welc = (props) => {
      return (
        <div>
          <p>You are welcome here {props.name}</p>
        </div>
      );
    };

    const App  = () => {
      return (
        <div>
          <h1>Greetings</h1>
            <Hello />
            <Hello />
            <br />
            <Welc name="damigreen" />
            <Welc name="George Daisy" />
        </div>
      );
    };

There can be an arbitrary number of props and their values can be "hard coded" strings or results of JavaScript expressions. If the value of the prop is achieved using JavaScript it must be wrapped it with curly braces.

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
    const App = () => {
      const name = 'peter';
      const age = '23';

      console.log('Hello from damigreen')
      return (
      <div>

      <h3>to our customers</h3>
      <HelloProps name="Maya" age={8+3} />
      <HelloProps name={name} age={age} />
      </div>
    )
    };
The props sent by the component A p p are the values of the variables, the result of the evaluation of the sum expression and a regular string.

### Some notes

React has been congured to generate quite clear error messages. Despite this, you should, at least in the beginning, advance in very small steps and make sure that every change works as desired.

The console should always be open. If the browser reports errors, it is not advisable to continue writing more code, hoping for miracles. You should instead try to understand the cause of the error and, for example, go back to the previous working state:

It is good to remember that in React it is possible and worthwhile to write console.log() commands (which print to the console) within your code.
Also keep in mind that React component names must be capitalized. If you try dening a component as follows

Note that the content of a React component (usually) needs to contain one root element. If we, for example, try to dene the component A p p without the outermost d iv -element:

Using a root element is not the only working option. An a r r a y of components is also a valid solution

    const App = () => {
      return [
        <h1>Greetings</h1>,
        <hello name="Maya" age={8+4} />,
        <Footer />
      ]
    }

However, when dening the root component of the application this is not a particularly wise thing to do, and it makes the code look a bit ugly.

Because the root element is stipulated, we have "extra" div-elements in the DOM-tree. This can be avoided by using fragments, i.e. by wrapping the elements to be returned by the component with an empty element:

    const App = () => {
      const name = 'peter';
      const age = '23';
      return (
        <>
          <h3>to our customers</h3>
          <HelloProps name="Maya" age={8+3} />
          <HelloProps name={name} age={age} />
        </>
      )
    };

### 14:10:19

### JavaScript

Javascript has advanced rapidly the last few years and in this course we use features from the newer versions. The ofcial name of the Javascript standard is ECMAScript. At this moment, the latest version is the one released in June of 2019 with the name ECMAScript® 2019, otherwise known as ES10

Browsers do not yet support all of Javascript's newest features. Due to this fact, a lot of code run in browsers has been t r a n s p il e d from a newer version of Javascript to an older, more compatible version.

Today, the most popular way to do the transpiling is using Babel. Transpilation is automatically congured in React applications created with create-react-app.

The code is written into les ending with .js and are run by issuing the command node name_of_file.js It is also possible to write Javascript code into the Node.js console, which is opened by typing node in the command-line, as well as into the browser's developer tool console.

    console.log(a, z)
    z += 4
    console.log(a,z)
    z = 'some_text'
    console.log(a,z)
    // VM687:1 6 4
    // VM687:3 6 8
    // VM687:5 6 "some_text"

const does not actually dene a variable but a c o n s t a n t for which the value can no longer be changed. On the other hand let denes a normal variable.

#### concat method

    const t2 = t.concat([3, 7])
    undefined
    console.log( t2)
    let list_t = t2.concat(4)
    console.log(list_t)
    // VM1235:1 (6) [1, -1, 3, 4, 3, 7]
    // VM1235:3 (7) [1, -1, 3, 4, 3, 7, 4]

The method call t.concat(5) does not add a new item to the old array but returns a new array which, besides containing the items of the old array, also contains the new item.

#### the map() method

Map can also transform the array into something completely different:

    (4) [1, -1, 3, 4]
    const m1 = t.map(value => value**2)
    console.log(m1)
    // VM1464:2 (4) [1, 1, 9, 16]

    const t =[1, -1, 3, 4]
    const m4 = t.map(value => '<li>' + value + '</li>';
    console.log(m4)
    // VM2002:1 Uncaught SyntaxError: missing ) after argument list
    const m4 = t.map(value => '<li>' + value + '</li>');
    console.log(m4)
    // VM2006:2 (4) ["<li>1</li>", "<li>-1</li>", "<li>3</li>", "<li>4</li>"]

### destructuring assignment

Individual items of an array are easy to assign to variables with the help of the destructuring assignment 

    const p = [2, 5, 6, 4]

    const[first, second, ...rest] = p
    undefined
    console.log(first, second);
    console.log(rest)

    // VM2738:1 2 5
    // VM2738:2 (2) [6, 4]

### Objects

There are a few different ways of dening objects in Javascript. One very common method is using object literals, which happens by listing its properties within braces:

    const object1 = {
      name: 'Aro Hellas',
      age: '24',
      education: 'Obafemi Awolowo Uniiversity',
    };
    const object2 = {
      name: 'Full Stack web appliction development',
      level: 'Intermediate studies',
      size: 5,
    };
    const object3 = {
      name: {
        first: 'damigreen',
        last: 'Abramov',
      },
      grades: [2, 5, 6 ,4],
      departmet: 'computer science',
    };

    console.log(object1.education)
    const field_name = 'age';
    console.log(object1[field_name])
    // VM3186:1 Obafemi Awolowo Uniiversity
    // VM3186:3 24

    // You can also add properties to an object on the fly by either using dot notation or using brackets
    object1.address = 'Nigeria';
    object1['secret_number'] = 42;

    console.log(object1.address);
    console.log(object1.secret_number)
    // VM3594:4 Nigeria
    // VM3594:5 42

    /* 
    *Functions
    */
    const cube = (p,q) => {
      return p**2*q;
    }

    let result = cube(4,4);
    console.log(result)
    // VM3882:6 64

### 15:10:19

### Object methods and "this"

    const damigreen = {
      name: 'Damiolola Faseun',
      age: 27,
      education: 'OAU',
      greet: function() {
          console.log('hello, my name is ' + this.name)
          console.log('and i am ' + this.age + ' years old')
      },
    }
    damigreen.greet()
    // VM789:6 hello, my name is Damiolola Faseun
    // VM789:7


    // Methods can be assigned to objects even after the creation of the object:
    const damigreen = {
      name: 'Damiolola Faseun',
      age: 27,
      education: 'OAU',
      greet: function() {
          console.log('hello, my name is ' + this.name)
          console.log('and i am ' + this.age + ' years old')
      },
    }
    damigreen.growOlder = function() {
      this.age += 1
    }
    console.log(damigreen.age)
    damigreen.growOlder()
    console.log(damigreen.age)
    // VM1641:13 27
    // VM1641:15 28


    // Let's slightly modify the object
    const damigreen = {
      name: 'Damiolola Faseun',
      age: 27,
      education: 'OAU',
      greet: function() {
          console.log('hello, my name is ' + this.name)
          console.log('and i am ' + this.age + ' years old')
      },
    do_addition: function(a,b) {
      console.log(a + b)
      },
    }
    damigreen.do_addition(1, 4);

    const reference_to_addition = damigreen.do_addition;
    reference_to_addition(10, 15)
    // VM1955:10 5
    // VM1955:10 25


    const damigreen = {
      name: 'Damiolola Faseun',
      age: 27,
      education: 'OAU',
      greet: function() {
          console.log('hello, my name is ' + this.name)
          console.log('and i am ' + this.age + ' years old')
      },
    do_addition: function(a,b) {
      console.log(a + b)
      },
    }
    damigreen.do_addition(1, 4);

    const reference_to_addition = damigreen.do_addition;
    const reference_to_greet = damigreen.greet;

    reference_to_addition(10, 15);
    reference_to_greet();

    // VM2089:10 5
    // VM2089:10 25
    // VM2089:6 hello, my name is 
    // VM2089:7 and i am undefined years old
    // undefined

When calling the method through a reference the method has lost knowledge of what was the original this . Contrary to other languages, in Javascript the value of this is dened based on h o w t h e me t h o d is c alle d . When calling the method through a reference the value of this becomes the so-called global object and the end result is often not what the software developer had originally intended.

One situation leading to the disappearance of this arises when, e.g. we ask Arto to greet in one second using the setTimeout method.

    const damigreen = {
      name: 'Damiolola Faseun',
      greet: function() {
      console.log('hello, my name is ', this.name)
      },
    }

    setTimeout(damigreen.greet, 2000)

    // 2
    // VM2421:4 hello, my name is

The value of this in Javascript is dened based on how the method is being called. When setTimeout is using the method, it is the Javascript engine that calls the method and this refers to the Timeout object.

There are several mechanisms by which the original this can be preserved. One of these is using a method called bind:
    const damigreen = {
      name: 'Damiolola Faseun',
      greet: function() {
      console.log('hello, my name is ', this.name)
      },
    }

    setTimeout(damigreen.greet.bind(damigreen), 2000);

    // 2
    // VM2504:4 hello, my name is  Damiolola Faseun

The command arto.greet.bind(arto) creates a new function where it has bound this to point to Arto independent of where and how the method is being called. *

### Classes

As mentioned previously, there is no class mechanism like the ones in object-oriented programming languages. There are, however, features in Javascript which make "simulating" object-oriented classes possible.
    class Person {
      constructor(name, age) {
          this.name = name;
          this.age = age;
      }
      greet() {
          console.log('Hello, my name is ', this.name)
      }
    }

    const adam = new Person('Adam Sandler', 42);
    adam.greet();

    const janja = new Person('Janja Reefer', 22);
    janja.greet();
    // VM974:7 Hello, my name is  Adam Sandler
    // VM974:7 Hello, my name is  Janja Reefer

When it comes to syntax the classes and the objects created from them are very reminiscent of Java classes and objects. Their behavior is also quite similar to Java objects. At the core they are still objects based on Javascript's prototype inheritance. The type of both objects is actually Object , since Javascript essentially only denes the types Boolean, Null, Undened,Number, String, Symbol, and Object.

### Component state, event handlers

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

### Destructuring

we will take a look at a small but useful feature of the JavaScript languagethat was added in the ES6 specication, that allows us to destructure values from objects andarrays upon assignment

    const Hello = (props) => {
      const name = props.name;
      const age = props.age;

      const { name, age } = props;

Destructuring makes the assignment of variables even easier, since we can use it to extract andgather the values of an object's properties into separate variables: */

## part1(c) : Component state , event handlers

### Page re-rendering

So far all of our applications have been such that their appearance remains the same after the initialrendering. What if we wanted to create a counter where the value increased as a function of time orat the click of a button

### Stateful Component

In the rst row, the application imports the useState-function:
import React useState from'react'
The function body that denes the component begins with the function call:
const counter setCounter =useState(0)

#### code

    import React, { useState } from 'react';
    import ReactDom from "react-dom";
    import { tsPropertySignature } from '@babel/types';

### page re-rendering

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

### Stateful component

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

### event handling

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

#### Event handlers are functions

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

### Passing state to child components

It's recommended to write React components that are small and reusable across the applicationand even across projects.
Let's refactor our application so that it's composed of three smallercomponents, one component for displaying the counter and two components for buttons

    Display component function
     const Display = (props) => {
       return (
         <div>{props.counter}</div>
       );
     };

     further using destruction on the component function parameter
     const Display = ({counter}) => {
       return (
         <div>
           {counter}
         </div>
       )
     }
     Using cmpact syntax for arrow function
    const Display = ({counter}) => <div>{counter}</div>

     const App = () => {
       const  [counter, set_counter] = useState(0);
       const set_to_value = (value) => () => set_counter(value);

       return (
         <div>
           <Display counter={counter} />

           <button onClick={set_to_value(counter+1)}>
             plus
           </button>

           <button onClick={set_to_value(0)}>
             zero
           </button>
         </div>
       );
     };

    // Buttons component function
     const Button = () => {
       <button onClick={props.onClick}>
         {props.text}
       </button>
     }

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

### 17:10:19

## part1 (d) : A more complex state, debugging React apps

### complex state

What if our application requires a more complex state? In most cases the easiest and best way to accomplish this is by using the useState functionmultiple times to create separate "pieces" of state.

### Old React

In this course we use the state hook to add state to our React components, which is part of thenewer versions of React and is available from version 16.8.0 onwards. Before the addition of hooks,there was no way to add state to React functional components. Components that required state hadto be dened as React class components using the JavaScript class syntax.In this course we have made the slightly radical decision to use hooks exclusively from day one, toensure that we are learning the future style of React. Even though functional components are thefuture of React, it is still important to learn the class syntax, as there are billions of lines of old Reactcode that you might end up maintaining some day. The same applies to documentation andexamples of React that you may stumble across on the internet.

### Debugging React applications

The first rule of web developmentKeep the browser's developer console open at all times.

The Console tab in particular should always be open, unless there is a specic reason to viewanother tab.Keep both your code and the web page open together at the same time, all the time

NB when you use console.log for debugging, don't combine objects in a Java-like fashion byusing a plus. Instead use a comma

Logging to the console is by no means the only way of debugging our applications. You can pausethe execution of your application code in the Chrome developer console's debugger, by writing thecommand debugger anywhere in your code

he execution will pause once it arrives at a point where the debugger command gets execute

Once the cause of the bug is discovered you can remove the debugger command and refresh thepage.

The debugger also enables us to execute our code line by line with the controls found in the right-hand side of the Source tab.

You can also access the debugger without the debugger command by adding break points in theSources tab. Inspecting the values of the component's variables can be done in the Scope-section:

### Rules of Hooks

There are a few limitations and rules we have to follow to ensure that our application uses hooks-based state functions correctly.

The useState function (as well as the useEffect function)must not be called from inside of a loop, a conditional expression, or any place that is not a functiondening a component. This must be done to ensure that the hooks are always called in the sameorder, and if this isn't the case the application will behave erratically

### Event Handling Revisited

In order to make the button react to a click event, we have to add an event handler to it.

Event handlers must always be a function or a reference to a function.

The button will not work ifthe event handler is set to a variable of any other type

The event handler is not a function but a variable assignment,

Functions returning functions can be utilized in dening generic functionality that can becustomized with parameters.

Choosing between the two presented ways of dening your event handlers is mostly a matter oftaste

    const App = (props) => {
      const [value, set_value] = useState(4000000000000);

      const set_to_value = (new_value) => () => {
        set_value(new_value);
      }
      
      const hello = (who) => {
          return () => console.log('hello', who);
        };

      const set_to_value = (new_value) => set_value(new_value);

      const hello = (who) => () => {
        console.log('hello', who);
      };

      return (
        <div>
          <button onClick={() => set_to_value(0)}>reset to zero</button>
          {value}
          <button onClick={() => set_to_value(4)}>reset to four</button>
          <button onClick={() => set_to_value(value + 1)}>increment</button><br /><br />
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

### Passing Event Handlers to Child Component

extract the button into its own component

Never define components inside of other components. 

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

### 30:10:19

## part2 (a) Rendering a collection, modules

### JavaScript Arrays

functional programming methods of the JavaScript array,such as find, filter, and map

### Rendeing collections

#### Key-attribute

React uses the key attributes of objects in an array to determine how to update
the view generatedby a component when the component is re-rendered

he elements generated by themap method, must each have a unique key value:
anttribute called key

Map always creates a new array, the elements of which havebeen created from the
elements of the original array by mapping, using the function given as aparameter
to the map method.

Anti-pattern: array inexes as keys

    notes.map((note, i) => ...)
example:

    const rows = () => notes.map((note, i) =>
        <li key={i}>
            {note.id}
        </li>)

A whole React application can be written on a single le. Although that is, of course,
not verypractical. Common practice is to declare each component in their own le as an ES6-module

    import React from'react'
    import ReactDOM from'react-dom'

imports two modules, enabling them to be used in the code. The react module is placed into
avariable called React and react-dom to variable ReactDOM

The convention is to name the file after the component

Note, that when importing our own components their location must be given in relation to the importing file:

remove the ReactDom Module from list of imported modules

if you clone a project, run the command npm install before starting the application with npmstart.

#### codes

    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';

    const result = notes.map(note => note.id);
    console.log(result);

former Note component before creating a Note Module to e exported.

    const Note = ({ note }) => (
        <li>{note.content}</li>
    );

App component before moving it to its own module component

    const App = ({notes}) => {
        const rows = () => notes.map(note =>
            (<Note
                key={note.id}
                note={note} />),
                );

                return (
            <div>
                <h1>Notes</h1>
                <ul>
                    <li>{notes[0].content}</li>
                    <li>{notes[1].content}</li>
                    <li>{notes[2].content}</li>
                </ul>
            </div>
        );
        
        using the map function
        return (
            <div>
                <ul>
                    {notes.map(note => <li>{note.content}</li>)}
                </ul>
            </div>
        );
        
        return (
            <div>
                <ul>
                    {rows()}
                </ul>
            </div>
        );
        };

    const notes = [
        {
            id: 1,
            content: 'HTML is easy',
            date: '30:10:19',
            important: true,
        },
        {
            id: 2,
            content: 'Browsers can execute only JavaScript',
            date: '01:11:19',
            important: false,
        },
        {
            id: 3,
            content: 'GET and POST are tht most important methods of HTTP protocol',
            date: '04:11:19',
            important: true,
        },
    ];


    ReactDOM.render(
        <App notes={notes} />,
        document.getElementById('root'),
    );

### 04:11  :19

## part2 (b) : Forms

### 08:11:19

## (c) Getting data from the server

tool meant to be used during software development called JSON Server to act as our server.

You can install JSON server globally on your machine using the command npm install -g json-server

    {
            "notes": [
          {
            "id": 1,
            "content": "HTML is easy",
            "date": "08:11:19",
            "important": true
          },
          {
            "id": 2,
            "content": "Browser can execute only Javascript",
            "date": "08:11:19",
            "important": false
          },
          {
            "id": 3,
            "content": "GET and POST are the most important mathods of the HTTP protocol",
            "date": "08:11:19",
            "important": false
          }
        ]
      }

we can run the json-server using the commandnpx

    npx json-server --port 3002 --watch json.db

fetching the data using XMLHttpRequest

he use of XHR is no longer recommended, and browsers already widely support the fetch method,which


is based on so-called promises, instead of the event-driven model used by XHR.

    const xhttp =new XMLHttpRequest()
    xhttponreadystatechange=function()
    if(thisreadyState == 4 && thisstatus ==200) {
     const data =JSON.parse(thisresponseText)
     }
    }
    xhttp.open('GET', '/data.json',true)
    xhttp.send()

### The browser as a runtime environmenet

JavaScript engines, or runtime environments, follow the asynchronous model.In principle,
this requires all IO-operations (with some exceptions) to be executed as non-blocking.

When an asynchronous operation is completed, or more specically, at some point after itscompletion,
the JavaScript engine calls the event handlers registered to the operation

Currently, JavaScript engines are single-threaded, which means that they cannot execute code in parallel.
As a result, it is a requirement in practise to use a non-blocking model for executing IO operations

    npm

t this point the dependencies part of the pakage.json file is of most interest to us as it denes what dependencies,
or external libraries, the project has

npm-commands should always be run in the project root directory, which is where thepackage.json le can be found

    npm run server

(--save) installed as a runtime dependency of the application,
because the execution of the program requires the existence of the library

(--save-dev), since theprogram itself doesn't require it. It is used for assistance during software development.

### Axios and promises

A Promise is an object representing the eventual completion or failure of an asynchronous operation
in other word it s an object that represents an asynchronous operation

Promise has three distict state

1. The promise is pending: It means that the final value (one of thefollowing two) is not available yet.

2. The promise is fulfilled: It means that the operation has completed andthe final value is available,
which generally is a successful operation.This state is sometimes also called resolved.

3. The promise is rejected: It means that an error prevented the finalvalue from being determined,
 which generally represents a failed operation

If, and when, we want to access the result of the operation represented by the promise, we mustregister
 an event handler to the promise. This is achieved using the method then.

    const promise = axios.get('http://localhost:3002/notes')
    promise.then(response => {
       console.log(response)
    })

Javascript runtime environment calls the callback function registered by the then method
providing it with a response object as a parameter. The response object contains all theessential data related
to the response of an HTTP GET request, which would include the returned data, status code, and headers.

toring the promise object in a variable is generally unnecessary, and it's instead common to chain
the then method call to the axios method call, so that it follows it directly:

    axios
        .get('http://localhost:3002/notes')
        .then((response) => {
            const notes = response.data;
            console.log(notes);
            ReactDOM.render(
                <App notes={notes} />,
                document.getElementById('root')
            )
        });
    
### Effect-hooks

the Efect-hook lets you perform side effects in functions components like data fetcing,
setting up a subsription, and manually hanging the DOM IN React components

 the function useEffect actually takes two parameters.
The first is a function, the effect itself. According to the documentation.

By default, effects run after every completed render, but you can choose to
fire it only whencertain values have changed.

The second parameter of useEffect is used to specify how often the effect is run. If the secondparameter
 is an empty array [], then the effect is only run along with the rst render of thecomponent

we can also use it like this

    useEffect (() => {
        const evenetHandler = response => {
            setNote(response.data);
        };
        const promise = axios.get('http:localhost:3002/notes');
        promise.then(evenetHandler)
    }, []);

### 19:11:2019

### Getting data from the server

In particular, we will be taking a look at the conventional use of routes, aka URLs and HTTP requesttypes, in REST

### REST

in REST terminology, we refer to individual data objects, such as the notes in our application, as resources

Every resource has a unique address associated with it - its URL. According to a generalconvention used by
json-server,

we would be able to locate an individual note at the resource URLnotes/3, where 3 is the id of the resource

The notes url, on the other hand, would point to aresource collection containing all the notes.
REsources are fetched from the server using the HTTP GET request

Creating a new resource for storing a note is done by making an HTTP POST request to the notesURL

### Sending Data to the server

 it's better to let the servergenerate ids for our resources

The newly created note resource is stored in the value of the data property of the responseobject

Sometimes it can be useful to inspect HTTP requests in the Network tab of Chrome developer tools
Once the data returned by the server starts to have an effect on the behavior of our webapplications,

we are immediately faced with a whole new set of challenges arising from, forinstance,

the asynchronicity of communication. This necessitates new debugging strategies,console logging and
other means of debugging become increasingly more important, and we mustalso develop a sufcient

understanding of the principles of both the JavaScript runtime and Reactcomponents

Extracting communications with the backend into a seperate module

### Promises and errors

The more common way of adding a handler for rejected promises is to use the catch method

If the request fails, the event handler registered with the catch method gets called.The catch method is

often utilized by placing it deeper within the promise chain.When our application makes an

HTTP request, we are in fact creating a promsise chain.

    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';
    import  './index.css';
    // import axios from 'axios';


    ReactDOM.render(<App />, document.getElementById('root'));

### 23:11:09

## part2 (e) : Adding styles to React app

CSS rules comprise of selectors and declarations. The selector denes which elements the ruleshould be applied to.

Using element types for dening CSS rules is slightly problematic. If our application contained otherli tags, the same style rule would also be applied

If we want to apply our style specically to notes, then it is better to use the class selectors

In React we have to use the className attribute instead of the class attribute

### inline styles

React also makes it possible to write styles directly in the code as so-called inline-style

Any React component or element can beprovided with a set of CSS properties as a JavaScript object through the style attribute.

React inline style object it would look like this:

    {
        color: "green",
        fontStyle: "italic",
        fontSize: 16
    }
Every CSS property is dened as a separate property of the JavaScript object.

Numeric values forpixels can be simply dened as integers. One of the major differences compared to regular CSS,

is that hyphenated (kebab case) CSS properties are written in camelCase

Inline styles come with certain limitations. For instance, so-called pseudo-classes can't be usedstraightforwardly since the separation of CSS, HTML,and JavaScript into separate les did not seem to scale well in larger applications

React bases the division of the application along the lines of its logical functional entities The structural units that make up the application's functional entities are React components

A React component denes the HTML for structuring the content, the JavaScript functions for determining functionality, and also the component's styling; all in one place.
This is to create individual components that are as independent and reusable as possible.

    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';
    import './index.css';
    // import axios from 'axios';


    ReactDOM.render(<App />, document.getElementById('root'));

## part3 (a) : Node.js and Express

24:11:19

Browsers don't yet support the newest features of JavaScript, and that iswhy the code running in the browser must be transpiled with e.g babel.

By default the package.json le also denes another commonly used npm script called npm test.

These days, code that runs in the browser uses ES6 modules.

Modules are dened with an exportand taken into use with an import.

### Simple web server

he code uses the createServer method of the http module to create a new web server.

Anevent handler is registered to the server, that is called every timean HTTP request
is made to theserver's address http:/localhost:3001.The request is responded to with the status code 200, with the Content-Type header set totext/plain, and the content of the site to be returned set to Hello World.

The last rows bind the http server assigned to the app variable, to listen to HTTP requests sent tothe port 300

The versioning model used in npm is called semantic versioning.

The caret in the front of ^4.17.1 means, that if and when the dependencies of a project are updated, the version of express that is installed will be at least 4.17.1.

We can update the dependencies of the project with the command:

     npm update

if we start working on the project on another computer, we can install all
up-to-datedependencies of the project dened in package.json with the command:

    npm install

If the major number of a dependency does not change, then the newer versions should bebackwards compatible.

we dene two routes to the application. The rst one denes an event handler, that is used tohandle HTTP GET requests made to the application's / root:

    app.get('/', (request response) =>  {
      response.send('<h1>Hello World!</h1>');
    })

The event handler function accepts two parameters.

* The first request parameter contains all of theinformation of the HTTP request, 
* and the second response parameter is used to dene how therequest is responded to

### http server using node.js
>
> <!--       using nodejs to create a server that is lstening to request from port 3002
>           and responding with the note object -->
>
>     console.log('Hello, world');
>     const http = require('http');
>
>     const app = http.createServer((request, response) => {
>       response.writeHead(200, { 'Content-type': 'text/plain' })
>       response.end(JSON.stringify(notes));
>       res.end('Hello,world');
>     });
>

### REST-

Representational State Transfer, aka. REST was introduced in 2000 in Roy Fielding's dissertation. REST is an architectural style meant for building scalable web applications.

notes in the case of our application, arecalled resources in RESTful thinking. Every resource has an associated URL which is the resource'sunique address.One convention is to create the unique address for resources by combining the name of theresource type with the resource's unique identier.

We can execute different operations on resources. The operation to be executed is dened by theHTTP verbs e.g GET,POST, PUT, DELETE, PATCH.

### Fetchin a single resources

The unique address we will use for an individual note is of the form notes/10, where the number atthe end refers to the note's unique id number.

We can denfine parameters for routes in express by using the colon syntax:

    app.get('/notes/:id', (request, response) => {
      const id = request.params.id;
      const note = notes.find(note => note.id == id);
      response.json(note);
    });

    <!-- using the exlicit return statement -->
    app.get('/notes/:id', (request, response) => {
      const id = request.params.id;
      const note = notes.find(note => {
        console.log(note.id, typeof note.id, typeof id, note.id == id)
        return note.id === id
      });
      console.log(notes)
      response.json(notes)
    });

The note variable is set to undefined if no matching note is found. If no note is found, theserver should respond with the the status code 404 not found instead of 202.

    app.get('/notes/:id', (request, response) => {
     const id = Number(request.params.id)
    const id = request.params.id;
    const note = notes.find(note => note.id == id);
      if (note) {
        console.log(notes);
        response.json(note);
      } else 
        response.status(404).end();
    });

### Deleting resources

Deletion happens by making an HTTP DELETE request to the url of the resource:

If deleting the resource is successful, meaning that the note exists and it is removed, we respond tothe request with the status code 204 no content and return no data with the response

    app.delete('/notes/:id', (request, response) => {
      const id = request.params.id;
      notes = notes.filter(note => note.id !== id)

      response.status(202).end()
    })

There's no consensus on what status code should be returned to a DELETE request if the resourcedoes not exist. Really, the only two options are 204 and 404. For the sake of simplicity ourapplication will respond with 204 in both cases.

### Postman

* curl
* postman

### The Visual Studio Code REST client

Install the VS Code REST client

make a directory at the root of application named requests. We save all the REST client requests in the directory as files that end with the .rest extension.

By clicking the Send Request text, the REST client will execute the HTTP request and response from the server is opened in the editor.

### Receiving data

adding notes to the server which happens by making a HTTP POST request to the address <http://localhost:3001/notes>, and by sending all the informationfor the new note in the request body in the JSON format. In order to access the data easily, we need the help of the body-parser library

    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');

    app.use(bodyParser.json());

Without a body-parser, the body property would be undefined.

The body-parser takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the body property of the request object before the **route handler** is called.

    app.post('/notes', (request, response) => {
      const note = request.body;
      console.log(note)

      response.json(note)
    });

the event handler function can access the body property of the request object

### **Note**

Keep the terminal running the application visible at all times when you are working on thebackend. Thanks to Nodemon any changes we make to the code will restart the application

A potential cause for issues is an incorrectly set Content-Type header in requests. This can happenwith Postman if the type of body is not dened correctly

### **sidenote**

Sometimes when you're debugging, you may want to nd out what headers have been set inthe HTTP request. One way of accomplishing this is through the get method of therequest object, that can be used for getting the value of a single header. The requestobject also has the headers property, that contains all of the headers of a specic request.

Problems can occur with the VS REST client if you accidentally add an empty line betweenthe top row and the row specifying the HTTP headers. In this situation, the REST clientinterprets this to mean that all headers are left empty, which leads to the backend server notknowing that the data it has received is in the JSON format.

You will be able to spot this missing Content-Type header if at some point in your code you print allof the request headers with the console.log(request.headers) command.

    app.post('/notes', (request, response) => {
        // generate id for the requested note 
        const maxId = notes.length > 0 ?  Math.max(...notes.map(n => n.id)) : 0;

        // console.log(note)
        const note = request.body;
        note.id = maxId + 1;

        notes = notes.concat(note);

        response.json(note)
    });

this method is usually not recommended.

Let's improve the application by dening that the content property maynot be empty. The important and date properties will be given default values. All other propertiesare discarded

    Mathmax(...notes.map(n => n.id))

What exactly is happening in that line of code? `notes.map(n => n.id)` creates a new array thatcontains all the id's of the notes. Math.max returns the maximum value of the numbers that arepassed to it. However, `notes.map(n => n.id)` is an array so it can't directly be given as a parameter to Math.max. The array can be transformed into individual numbers by using the"three dot" spread syntax.

### About HTTP request types

The HTTP standards talks about two properties related to request types, **safety** and **idempotence**.The HTTP GET request should be safe.

> GET and HEAD methods SHOULDNOT have the signicance of taking an action other than retrieval.  These methods ought to beconsidered "safe".

Safety means that the executing request must not cause any side effects in the server. By side-effects we mean that the state of the database must not change as a result of the request, and theresponse must only return data that already exists on the server.

The HTTP standard also denes the request type HEAD, that ought to be safe. In practice HEADshould work exactly like GET but it does not return anything but the status code and responseheaders. The response body will not be returned when you make a HEAD request.

All HTTP requests except POST should be idempotent:

>Methods can also have the property of "idempotence" in that (aside from error or expirationissues) the side-effects of N > 0 identical requests is the same as for a single request. Themethods GET, HEAD, PUT and DELETE share this property.

This means that if a request has side-effects, then the result should be same regardless of howmany times the request is sent.

POST is the only HTTP request type that is neither safe nor idempotent. If we send 5 different HTTPPOST requests to /notes with a body of {content: "many same", important: true}, theresulting 5 notes on the server will all have the same content.

### Middleware

Middleware are functions that can be used for handling request and response objects. e.g body-parser.

Middleware is a function that receives three parameters:

    const requestLogger = (request, response, next) => {
      console.log('Method:', request.method);
      console.log('Path:', request.path);
      console.log('Body:', request.body);
      console.log('------');
      next();
    }

At the end of the function body the next function that was passed as a parameter is called. The `next` function yields control to the next middleware.

Middlewares are taken into use like this:

    app.use(requestLogger);

Middleware functions have to be taken into use before routes if we want them to be executed before the route event handlers are called.

There are also situations where we want to denemiddleware functions after routes. In practice, this means that we are dening middlewarefunctions that are only called if no route handles the HTTP request.

used for catching requests made to non-existent routes. For these requests, the middleware will return an error message in the JSONformat.

    const unknownEndpoint = (request, response) => {
      response.status(404).send({ error: 'unknown endpoint' });
    }

    app.use(unknownEndpoint);
