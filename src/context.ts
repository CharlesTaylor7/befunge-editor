import type { Context } from 'react'
import { useContext, createContext } from 'react'
import type { Lens } from 'ramda'
import * as R from 'ramda'
import type { AppState } from '@/types'

export const AppContext: Context<any> = createContext(null)

type Endo<T> = (t: T) => T
type SetterInput<T> = T | Endo<T>
type Setter<T> = (input: T | Endo<T>) => void

const setters: Map<string, Setter<any>> = new Map()

function makeSetter<T>(setState: any, lens: Lens<AppState, T>, field: string): Setter<T> {
  return (inner: T | Endo<T>) => {
    if (typeof inner == 'function') {
      setState(R.over(lens, inner as Endo<T>))
    } else {
      setState(R.set(lens, inner))
    }
  }
}
type AppLens<K extends keyof AppState> = Lens<AppState, AppState[K]>
type Field<K extends keyof AppState> = AppState[K]

export function useAppState<K extends keyof AppState>(field: K): [Field<K>, Setter<Field<K>>] {
  const [state, setState] = useContext(AppContext)
  const lens: AppLens<K> = R.lensProp(field)
  let setter = setters.get(field) as Setter<Field<K>>
  if (!setter) {
    setter = makeSetter(setState, lens, field)
    setters.set(field, setter)
  }
  return [R.view(lens, state), setter as Setter<Field<K>>]
}
