/**
 * @jest-environment jsdom
 */
import React from 'react'
import { Map } from 'immutable'
import { fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Cell from '@/cra/components/Cell'
import render from '@/cra/utilities/rtl-redux-render'

describe('cell', () => {
  afterEach(cleanup)

  it('receives focus when clicked on', () => {
    const { getByTestId } = render(
      <div>
        <Cell position={{ x: 0, y: 0 }} />
        <Cell position={{ x: 1, y: 0 }} />
      </div>,
      { initialState: { dimensions: { width: 2, height: 1 } } },
    )

    const cellDiv = getByTestId('cell-div-1-0')
    const cellInput = getByTestId('cell-input-1-0')
    fireEvent.click(cellDiv)

    expect(cellInput).toBe(document.activeElement)
  })
})
