import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Togglable from './Togglable';

describe('<Togglable />', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" />
      </Togglable>
    )
  });

  test('render its children', () => {
    component.container.querySelector('.testDiv')
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  });

  test('after clicking the button, chldren are displayed',() => {
    const button = component.getByText('show...')
    fireEvent.click(button);

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('diaplay: none');
  });
  
  test('togggled content can be closed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)
  
    const closeButton = component.getByText('cancel')
    fireEvent.click(closeButton)
  
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  });

});

