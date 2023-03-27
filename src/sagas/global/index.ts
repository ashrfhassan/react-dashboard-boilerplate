import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  UPDATE_APP_STATUS_SAGA,
  IUpdateAppStatusActionSaga,
  IUpdateAuthUserActionSaga,
  UPDATE_AUTH_USER_SAGA,
} from './types';
import {
  updateAuthUserAction,
  updateStatusAction,
} from '../../reducers/global/actions';

function* updateAppStatus(action: IUpdateAppStatusActionSaga) {
  yield put(updateStatusAction({ appStatus: action.payload.appStatus }));
}

export function* watchUpdateAppStatus() {
  yield takeEvery(UPDATE_APP_STATUS_SAGA, updateAppStatus);
}

function* updateAuthUser(action: IUpdateAuthUserActionSaga) {
  yield put(updateAuthUserAction({ authUser: action.payload.authUser }));
}

export function* watchUpdateAuthUser() {
  yield takeEvery(UPDATE_AUTH_USER_SAGA, updateAuthUser);
}
