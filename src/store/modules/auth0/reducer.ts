import { AUTHENTICATE_PENDING, AUTHENTICATE_SUCCESS, AUTHENTICATE_ERROR, DEAUTHENTICATE } from './actions';

const initialState = {
  authenticated: null,
  authenticatePending: null,
  authenticateResponse: null,
  authenticateError: null,
};

export default function auth0(state = initialState, action: { type: any; payload: any; error: any }) {
  switch (action.type) {
    case AUTHENTICATE_PENDING:
      return {
        ...state,
        authenticated: null,
        authenticatePending: true,
        authenticateResponse: null,
        authenticateError: null,
      };

    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        authenticated: true,
        authenticatePending: false,
        authenticateResponse: action.payload,
      };

    case AUTHENTICATE_ERROR:
      return {
        ...state,
        authenticated: false,
        authenticatePending: false,
        authenticateError: action.error,
      };

    case DEAUTHENTICATE:
      return {
        ...state,
        authenticated: null,
        authenticatePending: null,
        authenticateResponse: null,
        authenticateError: null,
      };

    default:
      return state;
  }
}
