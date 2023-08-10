import { all } from 'redux-saga/effects';
import {
  watchUpdateAppStatus,
  watchUpdateAuthUser,
  watchUpdateScreenLoader,
} from './global';

export default function* rootSaga() {
  yield all([
    watchUpdateAppStatus(),
    watchUpdateAuthUser(),
    watchUpdateScreenLoader(),
  ]);
}
