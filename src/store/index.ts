/* eslint-disable camelcase */
import {
  legacy_createStore,
  compose,
  combineReducers,
  applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import reducers from '../reducers';
import { isAuth } from './middlewares';
import { logger } from 'redux-logger';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddleware = createSagaMiddleware();

let composer;
const middleware = [sagaMiddleware, isAuth];
if (process.env.NODE_ENV === 'development') {
  composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  middleware.push(logger);
} else {
  composer = compose; // add support for Redux dev tools
}

const storeReducers = combineReducers({
  ...reducers,
});

export const store = legacy_createStore(
  storeReducers,
  composer(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof storeReducers>;
