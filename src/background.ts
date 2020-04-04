import { wrapStore } from 'webext-redux';

import configureStore from './store/configure';

const store = configureStore({ initialState: { counter: null} });

wrapStore(store);
