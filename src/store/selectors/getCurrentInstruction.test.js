import getCurrentInstruction from './getCurrentInstruction'

describe('getCurrentInstruction', () => {
  it('retrieves instruction at execution pointer', () => {
    expect(getCurrentInstruction({
      grid: {'1-0': 'a'},
      executionPointer: { x: 1, y: 0 }
    }))
      .toBe('a');
  })
  it('treats missing input as space', () => {
    expect(getCurrentInstruction({
      grid: {},
      executionPointer: { x: 2, y: 3 }
    }))
      .toBe(' ');
  })
  it('treats empty input as space', () => {
    expect(getCurrentInstruction({
      grid: { '2-3': '' },
      executionPointer: { x: 2, y: 3 }
    }))
      .toBe(' ');
  })
})
