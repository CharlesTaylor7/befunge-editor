/**
 * @jest-environment jsdom
 */
import React from 'react'
import { Map } from 'immutable'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import Befunge from '@/components/Befunge'

describe('Befunge', () => {
  test('Text Editor', async () => {
    const { getByTestId } = render(<Befunge />)
    const textArea = getByTestId('befunge-text-editor')

    const user = await userEvent.setup()
    const userInput = 'abcdef\n1234'

    // User fills out text area
    await user.click(textArea)
    await user.keyboard(userInput)
    expect(textArea).toBe(document.activeElement)
    expect(textArea.value).toEqual(userInput)

    // Tabbing away copies the text into the grid, and swaps the components
    await user.keyboard('{Tab}')

    let cellInput = getByTestId('cell-input')
    for (let line of userInput.split('\n')) {
      for (let input of line) {
        expect(cellInput.value).toEqual(input)
        await user.keyboard('{Tab}')
        cellInput = document.activeElement
      }
    }
  })
})
