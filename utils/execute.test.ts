import { Stack } from 'immutable'
import execute from '@/utils/execute'
import MyStack from '@/utils/stack'
import { initialExecutionState, ExecutionState } from '@/utils/befunge'

describe('execute', () => {
  it('throws on unknown instructions', () => {
    expect(() => execute(initialExecutionState, 'b')).toThrow("Unrecognized instruction: 'b'")
  }),
    it('throws if instruction is not a string', () => {
      expect(() => execute(initialExecutionState, 2 as unknown as string)).toThrow('Instruction is not a string')
    })
  it('throws if instruction is more than a single character', () => {
    expect(() => execute(initialExecutionState, 'too long')).toThrow('Instruction should be a single character')
  })
  it('throws if instruction is less than a single character', () => {
    expect(() => execute(initialExecutionState, '')).toThrow('Instruction should be a single character')
  })
  it('throws for capital V', () => {
    expect(() => execute(initialExecutionState, 'V')).toThrow("Unrecognized instruction: 'V'")
  })
  it('sets heading downward for lowercase v', () => {
    expect(execute(initialExecutionState, 'v')).toMatchObject({
      heading: 'D',
    })
  })
  it('does nothing with space', () => {
    const state = initialExecutionState
    expect(execute(state, ' ')).toBe(state)
  })
  it('pushes digits onto the stack', () => {
    const newState = execute({ stack: Stack() } as ExecutionState, '1')
    expect(Array.from(newState.stack)).toEqual([1])
  })
})
