import { IAuthUser } from '../../dtos/IAuthUser';

export const UPDATE_APP_STATUS_SAGA = 'UPDATE_APP_STATUS_SAGA';
export interface IUpdateAppStatusActionSaga {
  readonly type: typeof UPDATE_APP_STATUS_SAGA;
  payload: {
    appStatus: {
      currentLang: string;
    };
  };
}

export const updateAppStatus = (
  payload: IUpdateAppStatusActionSaga['payload']
): IUpdateAppStatusActionSaga => {
  return {
    type: UPDATE_APP_STATUS_SAGA,
    payload: payload,
  };
};

export const UPDATE_AUTH_USER_SAGA = 'UPDATE_AUTH_USER_SAGA';
export interface IUpdateAuthUserActionSaga {
  readonly type: typeof UPDATE_AUTH_USER_SAGA;
  payload: {
    authUser?: IAuthUser;
  };
}

export const updateAuthUser = (
  payload: IUpdateAuthUserActionSaga['payload']
): IUpdateAuthUserActionSaga => {
  return {
    type: UPDATE_AUTH_USER_SAGA,
    payload: payload,
  };
};

export const UPDATE_SCREEN_LOADER_SAGA = 'UPDATE_SCREEN_LOADER_SAGA';
export interface IUpdateScreenLoaderActionSaga {
  readonly type: typeof UPDATE_SCREEN_LOADER_SAGA;
  payload: {
    isOpen: boolean;
    content: React.ReactNode;
  };
}

export const updateScreenLoader = (
  payload: IUpdateScreenLoaderActionSaga['payload']
): IUpdateScreenLoaderActionSaga => {
  return {
    type: UPDATE_SCREEN_LOADER_SAGA,
    payload: payload,
  };
};
