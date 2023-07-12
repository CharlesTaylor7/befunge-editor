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
    const { getByTestId, queryAllByTestId } = render(<Befunge />)
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
    expect(getByTestId('befunge-grid-editor')).not.toBeNull()
    expect(queryAllByTestId('befunge-text-editor')).toEqual([])

    for (let line of userInput.split('\n')) {
      for (let input of line) {
        // You can tab through the grid cells
        await user.keyboard('{Tab}')
        expect(document.activeElement.value).toEqual(input)
      }
    }
  })
})
