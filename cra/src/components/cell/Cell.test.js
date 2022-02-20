import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Cell from './Cell'
import render from '../../utilities/rtl-redux-render'

describe('cell', () => {
  afterEach(cleanup);

  it('receives focus when clicked on', () => {

    const { getByTestId } = render(
      <div>
        <Cell position={{x: 0, y: 0}} />
        <Cell position={{x: 1, y: 0}} />
      </div>,
      { initialState: { dimensions: { width: 2, height: 1 }}}
    );

    const cellDiv = getByTestId('cell-div-1-0');
    const cellInput = getByTestId('cell-input-1-0');
    fireEvent.click(cellDiv);

    expect(cellInput).toBe(document.activeElement);
  })

  it('advances focus to the next position after receiving input', () => {

    const { getByTestId, store } = render(
      <div>
        <Cell position={{x: 0, y: 0}} />
        <Cell position={{x: 1, y: 0}} />
      </div>,
      { initialState: { dimensions: { width: 2, height: 1 }}}
    );

    const input1 = getByTestId('cell-input-0-0');
    fireEvent.change(input1, { target: { value: '$'}});

    const input2 = getByTestId('cell-input-1-0');
    expect(input1.value).toBe('$');
    expect(input2).toEqual(document.activeElement);
    expect(store.getState().editorFocus).toEqual({ x: 1, y: 0});
  });

  it('moves focus backwards when backspacing input', () => {

    const { getByTestId, store } = render(
      <div>
        <Cell position={{x: 0, y: 0}} />
        <Cell position={{x: 1, y: 0}} />
      </div>,
      {
        initialState: {
          dimensions: { width: 2, height: 1 },
          editorFocus: { x: 1, x: 0 },
          grid: { ['1-0']: '$' },
        }
      }
    );

    const cell_1_0 = getByTestId('cell-div-1-0');
    fireEvent.keyDown(cell_1_0, { key: 'Backspace'});

    expect(getByTestId('cell-input-1-0').value).toBe('');
    expect(store.getState().editorFocus).toEqual({ x: 0, y: 0});
    expect(getByTestId('cell-input-0-0')).toBe(document.activeElement);
  });
})
