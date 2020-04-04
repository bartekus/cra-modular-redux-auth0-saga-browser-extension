import { createAction } from '../../helpers';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD';
export const INCREMENT_ASYNC = 'INCREMENT_ASYNC';

export function increment() {
  return createAction(INCREMENT);
}

export function decrement() {
  return createAction(DECREMENT);
}

export function incrementIfOdd() {
  return createAction(INCREMENT_IF_ODD);
}

export function incrementAsync() {
  return createAction(INCREMENT_ASYNC);
}
