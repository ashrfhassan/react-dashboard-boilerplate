import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  UPDATE_APP_STATUS_SAGA,
  IUpdateAppStatusActionSaga,
  IUpdateAuthUserActionSaga,
  UPDATE_AUTH_USER_SAGA,
  IUpdateScreenLoaderActionSaga,
  UPDATE_SCREEN_LOADER_SAGA,
} from './types';
import {
  updateAuthUserAction,
  updateScreenLoaderAction,
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

function* updateScreenLoader(action: IUpdateScreenLoaderActionSaga) {
  yield put(
    updateScreenLoaderAction({
      isOpen: action.payload.isOpen,
      content: action.payload.content,
    })
  );
}

export function* watchUpdateScreenLoader() {
  yield takeEvery(UPDATE_SCREEN_LOADER_SAGA, updateScreenLoader);
}
