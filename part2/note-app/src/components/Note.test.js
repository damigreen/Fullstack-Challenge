import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Note from './Note';

test('render content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  };

  const component = render(
    <Note note={note} />
  );

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-librarymake not important'
  );

  const element = component.getByText(
    'Component testing is done with react-testing-library'
  );
  expect(element).toBeDefined();

  const div = component.container.querySelector('.note');
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );

  const li = component.container.querySelector('li');
  console.log(prettyDOM(li));

  component.debug();

});

test('clicking the button calls event handler once', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important:true
  };

  const mockHandler = jest.fn();

  const { getAllByText } = render(
    <Note note={note} toggleImportance={mockHandler} />
  );

  const button = getAllByText('make not important')[0];
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(1);

});