import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useRedirect } from './useRedirect';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store';
import { updateAuthUser } from '../sagas/global/types';

export const useAxios = (options?: { useRefreshToken: boolean }) => {
  const dispatch = useDispatch();
  const appStatus = useSelector(
    (state: AppState) => state.globalReducer.appStatus
  );
  const authUser = useSelector(
    (state: AppState) => state.globalReducer.authUser
  );
  const redirect = useRedirect(true);
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_GATEWAY_URI,
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
  });

  api.interceptors.request.use(
    async (config) => {
      config.headers.Authorization = options?.useRefreshToken
        ? authUser?.refresh_token
        : authUser?.access_token;
      config.headers['Accept-Language'] = appStatus.currentLang;
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response.data;
    },
    async function (error) {
      const originalConfig = error.config;
      if (authUser && error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URI}/authentication/refresh-token`,
            {
              headers: {
                Authorization: authUser.refresh_token,
              },
            }
          );
          dispatch(updateAuthUser({ authUser: { ...authUser, ...res.data } }));
          localStorage.setItem(
            'auth',
            JSON.stringify({ ...authUser, ...res.data })
          );
          originalConfig.headers.Authorization = res.data.access_token;
          return (await axios(originalConfig)).data;
        } catch (nestedErr: any) {
          // invalid refresh token as well
          if (nestedErr.response?.status === 403) {
            localStorage.clear();
            redirect('login');
          }
          return (await axios(originalConfig)).data;
        }
      }
      if (error.response?.status === 401) {
        localStorage.clear();
        redirect('login');
      }
      return Promise.reject(error);
    }
  );
  return { axios: api };
};
