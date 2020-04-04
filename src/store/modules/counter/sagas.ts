import { put, takeEvery, delay } from 'redux-saga/effects';

import { increment, INCREMENT_ASYNC } from './actions';

export function* incrementAsync() {
  yield delay(1000);
  yield put(increment());
}

export default function* counter() {
  yield takeEvery(INCREMENT_ASYNC, incrementAsync);
}
