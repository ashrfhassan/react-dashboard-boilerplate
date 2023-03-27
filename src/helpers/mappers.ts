import { AxiosError } from 'axios';
import { IsJsonString } from './index';

/* eslint-disable camelcase */
export const getApiErrorMessage = (
  error: AxiosError
): { error: string; message: string } => {
  return {
    error: error.response
      ? (error.response.data as any)?.error || error.message
      : error.message,
    message: error.response
      ? (error.response.data as any)?.message || error.message
      : error.message,
  };
};

export const getImageProp = (
  obj: any,
  imgPropName: string,
  defaultVal?: string
) => {
  if (obj && obj[imgPropName]) {
    return obj[imgPropName].trim() !== '' ? obj[imgPropName] : defaultVal;
  }
  return defaultVal;
};

export const mapLink = (url: string) => {
  if (url.includes('http')) return url;
  return 'http://' + url;
};

export const mapStringToJson = (arr: string[]) => {
  return arr
    .map((val) => {
      if (IsJsonString(val)) {
        return JSON.parse(val);
      }
      return null;
    })
    .filter((val) => val !== null);
};
