/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import App from '@/components/App'
import { gridInit } from '@/grid'

describe('App', () => {
  test('Text Editor', async () => {
    const { getByTestId, getByText, queryAllByTestId } = render(<App />)
    const textArea = getByTestId('befunge-text-editor') as HTMLTextAreaElement

    const user = await userEvent.setup()
    const program = 'abcdef\n1234'

    // User fills out text area
    await user.clear(textArea)
    await user.type(textArea, program)
    expect(textArea).toBe(document.activeElement)
    expect(textArea.value).toEqual(program)

    // Click toggle
    await user.click(getByText('Edit Text/Grid'))
    expect(getByTestId('befunge-grid-editor')).not.toBeNull()
    expect(queryAllByTestId('befunge-text-editor')).toEqual([])

    await user.click(getByTestId('cell-input-0-0'))
    for (const line of program.split('\n')) {
      for (const input of line) {
        // You can tab through the grid cells
        expect((document.activeElement as HTMLInputElement).value).toEqual(input)
        await user.keyboard('{Tab}')
      }
    }
  })
})
