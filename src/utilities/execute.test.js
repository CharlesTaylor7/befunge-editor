import { execute } from './execute'
import defaultState from '@/cra/store/defaultState'
import Stack from '@/utilities/stack'

describe('execute', () => {
  it('throws on unknown instructions', () => {
    await expect(execute(defaultState, { instruction: 'b' })).rejects.toThrow("Unrecognized instruction: 'b'")
  }),
    it('throws if instruction is not a string', () => {
      await expect(execute(defaultState, { instruction: 2 })).rejects.toThrow('Instruction is not a string')
    })
  it('throws if instruction is more than a single character', () => {
    await expect(execute(defaultState, { instruction: 'too long' })).rejects.toThrow('Instruction should be a single character')
  })
  it('throws if instruction is less than a single character', () => {
    expect(() => execute(defaultState, { instruction: '' })).toThrow('Instruction should be a single character')
  })
  it('throws for capital V', () => {
    expect(() => execute(defaultState, { instruction: 'V' })).toThrow("Unrecognized instruction: 'V'")
  })
  it('sets heading downward for lowercase v', () => {
    expect(execute(defaultState, { instruction: 'v' })).toMatchObject({
      heading: 'Down',
    })
  })
  it('does nothing with space', () => {
    expect(execute(defaultState, { instruction: ' ' })).toBe(defaultState)
  })
  it('pushes digits onto the stack', () => {
    const newState = execute({ ...defaultState, stack: Stack.empty }, { instruction: '1' })
    expect(Array.from(newState.stack)).toEqual([1])
  })
})
