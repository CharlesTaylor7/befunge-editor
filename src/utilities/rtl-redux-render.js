import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render as rtlRender } from '@testing-library/react'
import rootReducer from '../store/reducers'
import * as R from 'ramda'
import defaultState from '../store/initialState'

// From https://github.com/kentcdodds/react-testing-library-course/blob/master/src/__tests__/redux-03.js:
export default (
  ui,
  {
    initialState,
    store = createStore(rootReducer, R.mergeRight(defaultState, initialState)),
    ...renderOptions
  } = {},
) => {
  const Wrapper = ({children}) => (
    <Provider store={store}>
      {children}
    </Provider>
  );
  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
    store,
  }
}
