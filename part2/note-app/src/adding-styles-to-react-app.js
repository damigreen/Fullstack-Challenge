/*
*23:11:09
*(e) Adding styles to React app
 */

// CSS rules comprise of selectors and declarations. The selector denes which elements the ruleshould be applied to.
//
// Using element types for dening CSS rules is slightly problematic.
//
// If our application contained otherli tags, the same style rule would also be applied to the
//
// If we want to apply our style specically to notes, then it is better to use the class selectors
//
// In React we have to use the className attribute instead of the class attribute
//
// *inline styles
// React also makes it possible to write styles directly in the code as so-called inline-style
//
// Any React component or element can beprovided with a set of CSS properties
//
// as a JavaScript object through the style attribute.
//
// React inline style object it would look like this:
// {
//     color: "green",
//     fontStyle: "italic",
//     fontSize: 16
// }
// Every CSS property is dened as a separate property of the JavaScript object.
//
// Numeric values forpixels can be simply dened as integers. One of the major differences compared to regular CSS,
//
// is that hyphenated (kebab case) CSS properties are written in camelCase
//
// Inline styles come with certain limitations. For instance, so-called pseudo-classes can't be usedstraightforwardly
//
// since the separation of CSS, HTML,and JavaScript into separate les did not seem to scale well in larger applications
//
// React bases the division of the application along the lines of its logical functional entities
//
// The structural units that make up the application's functional entities are React components
//
// A React component denes the HTML for structuring the content, the 
// JavaScript functions for determining functionality, and also the component's styling; all in one place. 
// 
// This is to create individual components that are as independent and reusable as possible.

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// import axios from 'axios';


ReactDOM.render(<App />, document.getElementById('root'));
