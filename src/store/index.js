import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import * as R from 'ramda'

import defaultState from './defaultState'
import rootReducer from './reducers'
import rootSaga from './sagas'

export default (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    R.mergeRight(defaultState, initialState),
    composeWithDevTools(
      applyMiddleware(sagaMiddleware)
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
