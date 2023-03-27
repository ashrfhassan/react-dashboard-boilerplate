import { IAuthUser } from '../../dtos/IAuthUser';

export const ERROR_MESSAGE = 'ERROR_MESSAGE';
export interface IDisplayErrorMessageAction {
  readonly type: typeof ERROR_MESSAGE;
  payload: {
    message: string;
  };
}

export const displayErrorMessageAction = (
  payload: IDisplayErrorMessageAction['payload']
): IDisplayErrorMessageAction => {
  return {
    type: ERROR_MESSAGE,
    payload: payload,
  };
};

export const UPDATE_APP_STATUS = 'UPDATE_APP_STATUS';
export interface IUpdateAppStatusAction {
  readonly type: typeof UPDATE_APP_STATUS;
  payload: {
    appStatus: {
      currentLang: string;
    };
  };
}

export const updateStatusAction = (
  payload: IUpdateAppStatusAction['payload']
): IUpdateAppStatusAction => {
  return {
    type: UPDATE_APP_STATUS,
    payload: payload,
  };
};

export const UPDATE_AUTH_USER = 'UPDATE_AUTH_USER';
export interface IUpdateAuthUserAction {
  readonly type: typeof UPDATE_AUTH_USER;
  payload: {
    authUser?: IAuthUser;
  };
}

export const updateAuthUserAction = (
  payload: IUpdateAuthUserAction['payload']
): IUpdateAuthUserAction => {
  return {
    type: UPDATE_AUTH_USER,
    payload: payload,
  };
};

export type GlobalActions =
  | IDisplayErrorMessageAction
  | IUpdateAppStatusAction
  | IUpdateAuthUserAction;
