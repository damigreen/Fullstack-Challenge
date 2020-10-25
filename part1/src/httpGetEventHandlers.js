
/* 

*(a) HTTP GET and Event Handlers

*HTTP GET
The server and the web browser communicate with each other using the HTTP protocol. The Network tab shows how the browser and the server communicate
the browser uses the browser header t0 render images correctyn the screen
The server has formed this document somehow. The document can be a s t a t ic text le saved into the server's directory. The server can also form the HTML documents d y n a mic ally according to the application code, using, for example, data from a database. 
In traditional web applications the browser is "dumb". It only fetches HTML data from the server, and all application logic is on the server
*Running application logic on the browser
using the xmlhttprequest
*/
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




/*

*Event handlers and Callback functions
an e v e n t h a n dle r for event o n r e a d y s t a t e c h a n g e is dened for the xhttp object doing the request. When the state of the object changes, the browser calls the event handler function. The function code checks that the readyState equals 4 (which depicts the situation T h e o p e r a t io n is c o mple t e ) and that the HTTP status code of the response is 200.
*/
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    //
  }
};
/*
*Document Object Model or DOM
We can think of HTML-pages as implicit tree structures.
html
   head
        link
             script
                body
                     div
                            h1
                              div
                                       ul
                                                  li
                                                             li
                                                                        li
                                                                               form
                                                                                        input
                                                                                                 input 
                                                              
The same treelike structure can be seen on the console tab Eleme n t s 

Document Object Model, or DOM is an Application Programming Interface, (an A P I ), which enables programmatic modication of the ele me n t t r e e s corresponding to web-pages.
The JavaScript code introduced in the previous chapter used the DOM-API to add a list of notes to the page. The following code creates a new node to the variable ul , and adds some child nodes to it
*/
const data = JSON.parse(this.response);

var ul = document.createElement('ul');

data.forEach(function(note) {
  var li = document.createElement('li');

  ul.appendChild(li);
  li.appendChild(document.createTextNode(note.content));
});

// Finally, the tree branch of the ul variable is connected to its proper place in the HTML tree of the whole page:

document.getElementById('notes').appendChild(ul);

/* 
*Manipulating the document-object from console
The topmost node of the DOM tree of a HTML document is called the document object. We can perform various operations on a web-page using the DOM-API. You can access the document object by typing document into the Console-tab:
 */
// Let's add a new note to the page from the console.
// First, we'll get the list of notes from the page. The list is in the rst ul-element of the page:

list = document.getElementsByTagName('ul')[0]

// Then create a new li-element and add some text content to it:

new_element = document.createElement('li');
new_element.textContent = 'page manipulation from console is easy';

list.appendChild(new_element);
/* 
*CSS
The h e a d element of the HTML code of the Notes page contains a link tag, which determines that the browser must fetch a CSS style sheet from the address main.css.

Cascading Style Sheets, or CSS, is a markup language used to determine the appearance of web applications.

HTML elements can also have other attributes than classes. The d iv element containing the notes has an id attribute. JavaScript code uses the id to nd the element.
The Ele me n t s tab of the console can be used to change the styles of the elements.
*Loading a page containing JavaScript - revised
The browser fetches the HTML code dening the content and the structure of the page from the server usng the HTTP GET request
Links in the HTML code cause the browser to also fetch the CSS style sheet ma in.c s s ...and a JavaScript code le ma in.js 
The browser executes the JavaScript code. The code makes an HTTP GET request to the address https://fullstack-exampleapp.herokuapp.com/data.json, which returns the notes as JSON data. 
When the data has been fetched, the browser executes an e v e n t h a n dle r , which renders the notes to the page using the DOM-API.
*Forms and HTTP POST
The code on the server responsible for the POST request is simple (NB: this code is on the server, and not on the JavaScript code fetched by the browser):
 */
app.post('/new_note', (req, res) => {
  notes.push({
    content: req.body.note,
    date: new Date(),
  });
  return res.redirect('/notes');
});
// The server can access the data by accessing the req.body eld of the request object req . The Server creates a new note object, and adds it to an array called notes 
// The Note objects have two elds: c o n t e n t containing the actual content of the note, and d a t e containing the date and time the note was created. The server does not save new notes to a database, so new notes disappear when Heroku restarts the service

/* 
*AJAX
AJAX (Asynchronous Javascript and XML) is a term introduced in February 2005 on the back of advancements in browser technology to describe a new revolutionary approach that enabled the fetching of content to webpages using JavaScript included within the HTML, without the need to rerender the page.

The Notes page uses AJAX to fetch the notes data. Submitting the form still uses the traditional mechanism of submitting web-forms.

*Single page app
In our example app, the home page works like a traditional web-page: All of the logic is on the server, and the browser only renders the HTML as instructed.
The Notes page gives some of the responsibility, generating the HTML code for existing notes, to the browser. The browser tackles this task by executing the JavaScript code it fetched from the server. The code fetches the notes from the server as JSON-data and adds HTML elements for displaying the notes to the page using the DOM-API. 

In recent years, the Single-page application (SPA) style of creating web-applications has emerged. SPA style websites don't fetch all of their pages separately from the server like our sample application does, but instead comprises of only one HTML page fetched from the server, the contents of which are manipulated with JavaScript that executes in the browser.

The Notes page of our application bears some resemblance to SPA-style apps, but it's not quite there yet. Even though the logic for rendering the notes is run on the browser, the page still uses the traditional way of adding new notes. The data is sent to the server with form submit, and the server instructs the browser to reload the Notes page with a r e d ir e c t .
A single page app version of our example application can be found from https://fullstackexampleapp.herokuapp.com/spa. At rst glance, the application looks exactly the same as the previous one. The HTML code is almost identical, but the JavaScript le is different ( s p a .js ) and there is a small change in how the form-tag is dened:

The SPA version of the app does not send the form data the traditional way, but instead uses the JavaScript code it fetched from the server.
 */
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
/*
The command document.getElementById('notes_form') instructs the code to fetch the form-element from the page, and to register an e v e n t h a n dle r to handle the form submit event. The event handler immediately calls the method e.preventDefault() to prevent the default handling of form submit. The default method would send the data to server and cause a redirect, which we don't want to happen.
Then the event handler creates a new note, adds it to the notes list with the command notes.push(note) , rerenders the note list on the page and sends the new note to the server. 

The code for sending the note to the server is as follows: 
 */
var send_to_server = function(note) {
  var xhttp_for_post = new XMLHttpRequest();
  // ...

  xhttp_for_post.open('POST', '/new_note_spa', true);
  xhttp_for_post.setRequestHeader( 
    'content-type', 'application/json'
  );
  xhttp_for_post.send(JSON.stringify(note));
};
// The code determines that the data is to be sent with an HTTP POST request and the data type is to be JSON. The data type is determined with a Co n t e n t - t y p e header. Then the data is sent as JSON string.

/* 
*Javascript-libraries

Instead of using JavaScript and the DOM-API only, different libraries containing tools that are easier to work with compared to the DOM-API are often used to manipulate pages. One of these libraries is the ever-so-popular JQuery.

The rise of the single page app brought several more "modern" ways of web development than JQuery. The favorite of the rst wave of developers was BackboneJS. After its launch in 2012, Google's AngularJS quickly became almost the de facto standard of modern web development.

However, the popularity of Angular plummeted after the Angular team announced in October 2014 that support for version 1 will end, and Angular 2 will not be backwards compatible with the rst version. Angular 2 and the newer versions have not gotten too warm of a welcome.

Currently the most popular tool for implementing the browser-side logic of web-applications is Facebook's React-library. During this course, we will get familiar with React and the Redux-library, which are frequently used together.

The status of React seems strong, but the world of JavaScript is ever changing. For example, recently a newcomer VueJS has been capturing some interest.

*/

/* 
*Introducton to React
The easiest way to get started by far is using a tool called create-react-app. It is possible (but not necessary) to install c r e a t e - r e a c t - a p p on your machine if the n p m tool that was installed along with Node has a version number of at least 5.3 .
to create a new react app
* npx create-react-app <app name>
* cd part1
to run the  new app
* npm start

* index.js
*/
import React from 'react';
import ReactDom from 'react-dom'

const app = () => (
  <div>
    <p>Hello, world</p>
  </div>
);

ReactDom.render(<app />, document.getElementById('root'));

/* 
*Component
The le in d e x.js now denes a React-component with the name A p p and the command on the nal line
*/
ReactDom.render(<app />, document.getElementById('root'));
// renders its contents into the d iv -element, dened in the le p u blic / in d e x.h t ml , having the id value 'root'.


/* 
Any JavaScript code within the curly braces is evaluated and the result of this evaluation is embedded into the dened place in the HTML produced by the component.
*/
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

/* 
*JSX
It seems like React components are returning HTML markup. However, this is not the case. The layout of React components is mostly written using JSX. Although JSX looks like HTML, we are actually dealing with a way to write JavaScript. Under the hood, JSX returned by React components is compiled into JavaScript.

In practice, JSX is much like HTML with the distinction that with JSX you can easily embed dynamic content by writing appropriate JavaScript within curly braces. The idea of JSX is quite similar to many templating languages, such as Thymeleaf used along Java Spring, which are used on servers.

JSX is "XML-like", which means that every tag needs to be closed. For example, a newline is an empty element, which in HTML can be written as follows:
* <br>
but when writing  JSX, the tag needs tto be closed
* <br />


*Multiple components
We have dened a new component H ello and used it inside the component A p p . Naturally, a component can be used multiple times:
 */
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
/* 
by combining components, even a more complex application can be kept fairly maintainable.

Another strong convention is the idea of a r o o t c o mp o n e n t called A p p at the top of the component tree of the application

*Nevertheless, there are situations where the component A p p is not exactly the root, but is wrapped within an appropriate utility component.

*props: passing data to components
It is possible to pass data to components using so called props
*/

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
/* 
There can be an arbitrary number of props and their values can be "hard coded" strings or results of JavaScript expressions. If the value of the prop is achieved using JavaScript it must be wrapped ith 
with curly braces.
 */
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
// The props sent by the component A p p are the values of the variables, the result of the evaluation of the sum expression and a regular string.

/* 
*Some notes
React has been congured to generate quite clear error messages. Despite this, you should, at least in the beginning, advance in very small steps and make sure that every change works as desired.

The console should always be open. If the browser reports errors, it is not advisable to continue writing more code, hoping for miracles. You should instead try to understand the cause of the error and, for example, go back to the previous working state:

It is good to remember that in React it is possible and worthwhile to write console.log() commands (which print to the console) within your code.
Also keep in mind that React component names must be capitalized. If you try dening a component as follows

Note that the content of a React component (usually) needs to contain one root element. If we, for example, try to dene the component A p p without the outermost d iv -element:

Using a root element is not the only working option. An a r r a y of components is also a valid solution
 */
const App = () => {
  return [
    <h1>Greetings</h1>,
    <hello name="Maya" age={8+4} />,
    <Footer />
  ]
}

// However, when dening the root component of the application this is not a particularly wise thing to do, and it makes the code look a bit ugly.

/* 
Because the root element is stipulated, we have "extra" div-elements in the DOM-tree. This can be avoided by using fragments, i.e. by wrapping the elements to be returned by the component with an empty element:
*/
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

/* 
*14:10:19
*JavaScript
Javascript has advanced rapidly the last few years and in this course we use features from the newer versions. The ofcial name of the Javascript standard is ECMAScript. At this moment, the latest version is the one released in June of 2019 with the name ECMAScript® 2019, otherwise known as ES10

Browsers do not yet support all of Javascript's newest features. Due to this fact, a lot of code run in browsers has been t r a n s p il e d from a newer version of Javascript to an older, more compatible version.

Today, the most popular way to do the transpiling is using Babel. Transpilation is automatically congured in React applications created with create-react-app.

The code is written into les ending with .js and are run by issuing the command node name_of_file.js It is also possible to write Javascript code into the Node.js console, which is opened by typing node in the command-line, as well as into the browser's developer tool console.
 */
console.log(a, z)
z += 4
console.log(a,z)
z = 'some_text'
console.log(a,z)
// VM687:1 6 4
// VM687:3 6 8
// VM687:5 6 "some_text"

/* 
const does not actually dene a variable but a c o n s t a n t for which the value can no longer be changed. On the other hand let denes a normal variable.
*concat method

*/
const t2 = t.concat([3, 7])
undefined
console.log( t2)
let list_t = t2.concat(4)
console.log(list_t)
// VM1235:1 (6) [1, -1, 3, 4, 3, 7]
// VM1235:3 (7) [1, -1, 3, 4, 3, 7, 4]

/* The method call t.concat(5) does not add a new item to the old array but returns a new array which, besides containing the items of the old array, also contains the new item.
*the map() method
Map can also transform the array into something completely different:

 */
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

/* 
*destructuring assignment
Individual items of an array are easy to assign to variables with the help of the destructuring assignment 
*/
const p = [2, 5, 6, 4]

const[first, second, ...rest] = p
undefined
console.log(first, second);
console.log(rest)

// VM2738:1 2 5
// VM2738:2 (2) [6, 4]

/* 
*Objects
There are a few different ways of dening objects in Javascript. One very common method is using object literals, which happens by listing its properties within braces:
 */
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

/* 
*15:10:19
*Object methods and "this"

 */
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

/* 
When calling the method through a reference the method has lost knowledge of what was the original this . Contrary to other languages, in Javascript the value of this is dened based on h o w t h e me t h o d is c alle d . When calling the method through a reference the value of this becomes the so-called global object and the end result is often not what the software developer had originally intended. 

One situation leading to the disappearance of this arises when, e.g. we ask Arto to greet in one second using the setTimeout method.
*/
const damigreen = {
  name: 'Damiolola Faseun',
  greet: function() {
  console.log('hello, my name is ', this.name)
  },
}

setTimeout(damigreen.greet, 2000)

// 2
// VM2421:4 hello, my name is

/* 
The value of this in Javascript is dened based on how the method is being called. When setTimeout is using the method, it is the Javascript engine that calls the method and this refers to the Timeout object.

There are several mechanisms by which the original this can be preserved. One of these is using a method called bind:*/
const damigreen = {
  name: 'Damiolola Faseun',
  greet: function() {
  console.log('hello, my name is ', this.name)
  },
}

setTimeout(damigreen.greet.bind(damigreen), 2000);


// 2
// VM2504:4 hello, my name is  Damiolola Faseun

/* 
The command arto.greet.bind(arto) creates a new function where it has bound this to point to Arto independent of where and how the method is being called. *

*Classes
As mentioned previously, there is no class mechanism like the ones in object-oriented programming languages. There are, however, features in Javascript which make "simulating" object-oriented classes possible.*/
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

/* 
When it comes to syntax the classes and the objects created from them are very reminiscent of Java classes and objects. Their behavior is also quite similar to Java objects. At the core they are still objects based on Javascript's prototype inheritance. The type of both objects is actually Object , since Javascript essentially only denes the types Boolean, Null, Undened, Number, String, Symbol, and Object. 

*Component state, event handlers
*/
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


/* 
*Destructuring
we will take a look at a small but useful feature of the JavaScript languagethat was added in the ES6 specication, that allows us to destructure values from objects andarrays upon assignment */
const Hello = (props) => {
  const name = props.name;
  const age = props.age;

  const { name, age } = props;

/* 
Destructuring makes the assignment of variables even easier, since we can use it to extract andgather the values of an object's properties into separate variables: */




































