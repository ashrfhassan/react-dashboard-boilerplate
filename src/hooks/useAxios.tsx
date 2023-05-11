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
      Authorization: options?.useRefreshToken
        ? authUser?.refresh_token
        : authUser?.access_token,
      'Accept-Language': appStatus.currentLang,
    },
  });

  api.interceptors.request.use(
    async (config) => {
      if (authUser) {
        try {
          await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URI}/authentication/check-auth`,
            {
              headers: {
                'Content-type': 'application/json',
                Accept: 'application/json',
                Authorization: authUser?.access_token,
                'Accept-Language': appStatus.currentLang,
              },
            }
          );
          return config;
        } catch (err: any) {
          if (
            err.response &&
            err.response.status == 401 &&
            authUser &&
            authUser.refresh_token
          ) {
            try {
              const res = await axios.get(
                `${process.env.REACT_APP_API_GATEWAY_URI}/authentication/refresh-token`,
                {
                  headers: {
                    Authorization: authUser.refresh_token,
                  },
                }
              );
              dispatch(updateAuthUser({ ...authUser, ...res.data }));
              localStorage.setItem(
                'auth',
                JSON.stringify({ ...authUser, ...res.data })
              );
              config.headers.Authorization = res.data.access_token;
            } catch (nestedErr: any) {
              // invalid refresh token as well
              if (nestedErr.response?.status === 403) {
                localStorage.clear();
                redirect('login');
              }
              return config;
            }
          }
          return config;
        }
      }
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
      if (error.response?.status === 401) {
        localStorage.clear();
        redirect('login');
      }
      return Promise.reject(error);
    }
  );
  return { axios: api };
};
