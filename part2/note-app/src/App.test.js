import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitForElement } from '@testing-library/react';
import App from './App';
jest.mock('./services/notes');

describe('<App />', () => {
  test('render all notes it gets from the backend', async () => {
    const component = render(
      <App />
    )

    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.note')
    )

    const notes = component.container.querySelectorAll('.note');
    expect(notes.length).toBe(2);

    expect(component.container).toHaveTextContent(
      'continue with the Harvard CS50 course'
    );

    expect(component.container).toHaveTextContent(
      'kill crash bandicot and tiny tiger'
    );
  });
});