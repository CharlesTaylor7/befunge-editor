import { Map } from 'immutable'
import getCurrentInstruction from './getCurrentInstruction'

describe('getCurrentInstruction', () => {
  it('retrieves instruction at execution pointer', () => {
    expect(
      getCurrentInstruction({
        grid: Map({ '1-0': 'a' }),
        executionPointer: { x: 1, y: 0 },
      }),
    ).toBe('a')
  })
  it('treats missing input as space', () => {
    expect(
      getCurrentInstruction({
        grid: Map({}),
        executionPointer: { x: 2, y: 3 },
      }),
    ).toBe(' ')
  })
  it('treats empty input as space', () => {
    expect(
      getCurrentInstruction({
        grid: Map({ '2-3': '' }),
        executionPointer: { x: 2, y: 3 },
      }),
    ).toBe(' ')
  })
})
