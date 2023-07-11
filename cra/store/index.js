import { createStore, applyMiddleware } from 'redux'
import * as R from 'ramda'

import rootReducer from './reducers'
import defaultState from '@/cra/store/defaultState'

const logger = (store) => (next) => (action) => {
  const oldState = store.getState()
  console.log('dispatching', action)
  let result = next(action)
  let state = store.getState()
  console.log('next state', state)

  return result
}

export default (initialState) =>
  createStore(
    rootReducer,
    R.mergeRight(
      R.mergeRight(defaultState, initialState),
      typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
    // applyMiddleware(logger)
  )
