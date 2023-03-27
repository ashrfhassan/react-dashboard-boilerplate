import { IAuthUser } from '../../dtos/IAuthUser';
import {
  GlobalActions,
  ERROR_MESSAGE,
  UPDATE_APP_STATUS,
  UPDATE_AUTH_USER,
} from './actions';

interface IGlobalState {
  errorMessage: string;
  appStatus: {
    currentLang: string;
  };
  authUser?: IAuthUser;
}

const globalState: IGlobalState = {
  errorMessage: '',
  appStatus: {
    currentLang: 'en',
  },
  authUser: undefined,
};

const globalReducer = (
  state = globalState,
  action: GlobalActions
): IGlobalState => {
  switch (action.type) {
    case ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload.message,
      };
    case UPDATE_APP_STATUS:
      return {
        ...state,
        appStatus: action.payload.appStatus,
      };
    case UPDATE_AUTH_USER:
      return {
        ...state,
        authUser: action.payload.authUser,
      };
    default:
      return state;
  }
};

export default globalReducer;
