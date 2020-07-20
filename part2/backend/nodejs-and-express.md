# React

## a: Node.js and Express

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

### REST

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
    // const id = Number(request.params.id)
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

adding notes to the server which happens by making a HTTP POST request to the address http://localhost:3001/notes, and by sending all the informationfor the new note in the request body in the JSON format. In order to access the data easily, we need the help of the body-parser library

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