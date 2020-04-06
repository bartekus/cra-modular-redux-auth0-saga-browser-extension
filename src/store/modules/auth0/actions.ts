import { createAction, createErrorAction } from '../../helpers';

export const AUTHENTICATE_PENDING = 'AUTHENTICATE_PENDING';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_ERROR = 'AUTHENTICATE_ERROR';

export const DEAUTHENTICATE = 'DEAUTHENTICATE';

export function authenticate() {
  return createAction(AUTHENTICATE_PENDING);
}

export function authenticateSuccess(payload: any) {
  return createAction(AUTHENTICATE_SUCCESS, payload);
}

export function authenticateError(error: any) {
  return createErrorAction(AUTHENTICATE_ERROR, error);
}

export function deauthenticate() {
  return createAction(DEAUTHENTICATE);
}
