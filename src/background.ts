import { wrapStore } from 'webext-redux';

import configureStore from './store/configure';
import NotifyService from './services/notify';
import AuthService from './services/auth0';
// @ts-ignore
import Actions from './store/actions';

const store = configureStore({ initialState: { counter: null }, services: { AuthService, NotifyService } });

wrapStore(store);

chrome.runtime.onMessage.addListener(function (event) {
  if (event.type === 'authenticate') {
    store.dispatch(Actions.authenticate());
  }

  if (event.type === 'deauthentication') {
    store.dispatch(Actions.deauthenticate());
  }
});
