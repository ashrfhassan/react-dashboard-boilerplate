import Constants from '../constants';
import { AxiosInstance } from 'axios';
import { getApiErrorMessage } from '../helpers/mappers';

export const fetchUsers = (axiosInstance: AxiosInstance) => () => {
  try {
    const response = axiosInstance.get('/users.json');
    return response;
  } catch (err: any) {
    return getApiErrorMessage(err);
  }
};
