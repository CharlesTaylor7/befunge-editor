import type { Context } from 'react'
import { useContext, createContext } from 'react'
import type { Lens } from 'ramda'
import * as R from 'ramda'
import type { AppState } from '@/types'

export const AppContext: Context<any> = createContext(null)

type Endo<T> = (t: T) => T
export function useAppState<T>(lens: Lens<AppState, T>): [T, (state: T | Endo<T>) => void] {
  const [state, setState] = useContext(AppContext)
  return [
    R.view(lens, state),
    (inner: T | Endo<T>) => {
      if (typeof inner == 'function') {
        setState(R.over(lens, inner as Endo<T>))
      } else {
        setState(R.set(lens, inner))
      }
    },
  ]
}
