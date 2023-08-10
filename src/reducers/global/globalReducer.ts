import { IAuthUser } from '../../dtos/IAuthUser';
import {
  GlobalActions,
  ERROR_MESSAGE,
  UPDATE_APP_STATUS,
  UPDATE_AUTH_USER,
  UPDATE_SCREEN_LOADER,
} from './actions';

interface IGlobalState {
  errorMessage: string;
  appStatus: {
    currentLang: string;
  };
  authUser?: IAuthUser;
  screenLoader: {
    isOpen: boolean;
    content: React.ReactNode;
  };
}

const globalState: IGlobalState = {
  errorMessage: '',
  appStatus: {
    currentLang: 'en',
  },
  authUser: undefined,
  screenLoader: {
    isOpen: false,
    content: '',
  },
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
    case UPDATE_SCREEN_LOADER:
      return {
        ...state,
        screenLoader: action.payload,
      };
    default:
      return state;
  }
};

export default globalReducer;
