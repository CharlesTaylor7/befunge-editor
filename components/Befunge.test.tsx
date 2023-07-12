import React from 'react'
import { Map } from 'immutable'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import Befunge from '@/components/Befunge'

/**
 * @jest-environment jsdom
 */
describe('cell', () => {
  // afterEach(cleanup)

  it('receives focus when clicked on', async () => {
    const user = await userEvent.setup();
    const { getByTestId } = render(<Befunge />)

    const textArea = getByTestId('befunge-program-editor')
    await user.click(textArea)
    await user.keyboard('abcdef\n1234')

    expect(textArea).toBe(document.activeElement)
  })
})