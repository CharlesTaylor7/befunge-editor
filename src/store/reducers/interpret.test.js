import interpret from './interpret'
import Stack from '../../utilities/Stack'

describe('interpret', () => {
  it('throws on unknown instructions', () => {
    expect(() => interpret({}, 'b'))
      .toThrow("Unrecognized instruction: 'b'")
  }),
  it('throws if instruction is not a string', () => {
    expect(() => interpret({}, 2))
      .toThrow('Instruction is not a string')
  })
  it('throws if instruction is more than a single character', () => {
    expect(() => interpret({}, 'too long'))
      .toThrow("Instruction should be a single character")
  })
  it('throws if instruction is less than a single character', () => {
    expect(() => interpret({}, ''))
      .toThrow("Instruction should be a single character")
  })
  it('does nothing with space', () => {
    const state = { };
    expect(interpret(state, ' '))
      .toBe(state)
  })
  it('pushes digits onto the stack', () => {
    const newState = interpret({ stack: Stack.empty }, '1')
    expect(Array.from(newState.stack))
      .toEqual([1])
  })
})
