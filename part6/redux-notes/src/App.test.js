import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const listElement = getByText('the app state is in redux store');
  expect(listElement).toBeInTheDocument();
});
