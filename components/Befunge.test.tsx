/**
 * @jest-environment jsdom
 */

import React from 'react'
import { Map } from 'immutable'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import Befunge from '@/components/Befunge'

describe('cell', () => {
  // afterEach(cleanup)

  it('receives focus when clicked on', async () => {
    const { getByTestId } = render(<Befunge />)
    const textArea = getByTestId('befunge-program-editor')

    const user = await userEvent.setup();
    await user.click(textArea)
    await user.keyboard('abcdef\n1234')

    expect(textArea).toBe(document.activeElement)
  })
})
