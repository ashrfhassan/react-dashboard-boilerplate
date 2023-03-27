import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import i18n from '../i18n';
import Constants from '../constants';

export const useRedirect = (reload?: boolean) => {
  const navigate = useNavigate();
  const navLocation = useLocation();
  const redirect = useCallback(
    (path = '') => {
      if (reload) {
        try {
          location.href =
            i18n.language === Constants.defaultLang
              ? `/${path}`
              : `/${i18n.language}/${path}`;
        } catch {
          location.href =
            i18n.language === Constants.defaultLang
              ? '/'
              : `/${i18n.language}/`;
        }
      } else if (
        navLocation.pathname !== `/${i18n.language}/${path}` &&
        navLocation.pathname !== `/${path}`
      ) {
        navigate(
          i18n.language === Constants.defaultLang
            ? `/${path}`
            : `/${i18n.language}/${path}`
        );
      }
    },
    [navLocation]
  );
  return redirect;
};
