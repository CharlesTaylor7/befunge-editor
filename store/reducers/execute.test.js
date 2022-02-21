import execute from './execute'
import Stack from '../../utilities/Stack'

describe('execute', () => {
  it('throws on unknown instructions', () => {
    expect(() => execute({}, 'b'))
      .toThrow("Unrecognized instruction: 'b'")
  }),
  it('throws if instruction is not a string', () => {
    expect(() => execute({}, 2))
      .toThrow('Instruction is not a string')
  })
  it('throws if instruction is more than a single character', () => {
    expect(() => execute({}, 'too long'))
      .toThrow("Instruction should be a single character")
  })
  it('throws if instruction is less than a single character', () => {
    expect(() => execute({}, ''))
      .toThrow("Instruction should be a single character")
  })
  it('throws for capital V', () => {
    expect(() => execute({}, 'V'))
      .toThrow("Unrecognized instruction: 'V'")
  })
  it('sets heading downward for lowercase v', () => {
    expect(execute({}, 'v'))
      .toMatchObject({
        heading: 'Down',
      })
  })
  it('does nothing with space', () => {
    const state = { };
    expect(execute(state, ' '))
      .toBe(state)
  })
  it('pushes digits onto the stack', () => {
    const newState = execute({ stack: Stack.empty }, '1')
    expect(Array.from(newState.stack))
      .toEqual([1])
  })
})
