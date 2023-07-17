/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import Befunge from '@/components/Befunge'
import { gridInit } from '@/grid'

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

  test('Preloaded program', async () => {
    const program = ['&>:1-:v v *_$.@', ' ^    _$>\\:^']
    const width = program[0].length
    const { getByTestId, queryAllByTestId } = render(
      <Befunge
        initialState={{
          ...gridInit(program),
        }}
      />,
    )

    const textArea = getByTestId('befunge-text-editor')
    expect(textArea.value).toEqual(program.map((line) => line.padEnd(width, ' ')).join('\n') + '\n')
  })
})
