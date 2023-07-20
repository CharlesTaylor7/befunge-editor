/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import App from '@/components/App'
import { gridInit } from '@/grid'

function sleep(ms): Promise<void> {
  return new Promise((resolve) => setInterval(resolve, ms))
}

describe('App', () => {
  test('Text Editor', async () => {
    const dom = render(<App />)
    const user = await userEvent.setup()
    const program = 'abcdef\n1234'

    // User fills out text area
    const textArea = (await dom.findByTestId('befunge-text-editor')) as HTMLTextAreaElement
    await user.clear(textArea)
    await user.type(textArea, program)
    expect(textArea).toBe(document.activeElement)
    expect(textArea.value).toEqual(program)

    // Click toggle
    await user.click(dom.getByTestId('toggle-editor'))
    expect(dom.getByTestId('befunge-grid-editor')).not.toBeNull()
    expect(dom.queryAllByTestId('befunge-text-editor')).toEqual([])

    await user.click(dom.getByTestId('cell-input-0-0'))
    for (const line of program.split('\n')) {
      for (const input of line) {
        // You can tab through the grid cells
        expect((document.activeElement as HTMLInputElement).value).toEqual(input)
        await user.keyboard('{Tab}')
      }
    }
  })

  test('Animate Button', async () => {
    // The app preloads with a factorial program
    const dom = render(<App animationIntervalMillis={0} />)

    const user = await userEvent.setup()

    //jest.useFakeTimers()
    // Click Animate button
    //await fireEvent(await screen.findByTestId('animate'), new MouseEvent('click'))
    user.click(await screen.findByTestId('animate'))

    // Should switch from text editor to grid view
    expect(await dom.findByTestId('befunge-grid-editor')).not.toBeNull()
    expect(dom.queryAllByTestId('befunge-text-editor')).toEqual([])

    await user.type(dom.findByLabelText('Stdin:'), 3)

    // 3! = 3 * 2 * 1 = 6
    expect(await dom.findByLabelText('Stdout:')).toEqual(6)
  })
})
