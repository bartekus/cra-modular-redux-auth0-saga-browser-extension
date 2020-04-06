import { put, call, takeLatest } from 'redux-saga/effects';

import { AUTHENTICATE_PENDING, authenticateSuccess, authenticateError, DEAUTHENTICATE } from './actions';

export function* signIn(services: any) {
  try {
    const response = yield call(services.AuthService.signIn);

    yield call(services.AuthService.localLogin, response);

    yield call(services.NotifyService.basic, { title: 'Login Successful', message: 'You can use the app now' });

    yield put(authenticateSuccess(response));
  } catch (err) {
    yield call(services.NotifyService.basic, { title: 'Login Failed', message: err.message });

    yield put(authenticateError(err));
  }
}

export function* signOut(services: any) {
  yield call(services.AuthService.signOut);

  yield call(services.NotifyService.basic, { title: 'Logout Successful', message: 'You are logged out now' });
}

// @ts-ignore
export default function* auth0(services) {
  yield takeLatest(AUTHENTICATE_PENDING, signIn, services);
  yield takeLatest(DEAUTHENTICATE, signOut, services);
}
