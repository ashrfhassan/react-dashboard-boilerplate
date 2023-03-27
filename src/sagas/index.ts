import { all } from 'redux-saga/effects';
import { watchUpdateAppStatus, watchUpdateAuthUser } from './global';

export default function* rootSaga() {
  yield all([watchUpdateAppStatus(), watchUpdateAuthUser()]);
}
