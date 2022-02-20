import { put } from 'redux-saga/effects'

export default function*() {
  yield put({ type: 'SET_GRID_DIMENSIONS', width: 80, height: 25 })
}
