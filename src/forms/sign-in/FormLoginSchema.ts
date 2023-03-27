import * as Yup from 'yup';
import { email, password } from '../../validation';
import i18n from '../../i18n';

export const loginSchema = () =>
  Yup.object().shape({
    email: email(
      i18n.t('global.validation.email'),
      i18n.t('global.validation.required')
    ),
    password: password(
      i18n.t('global.validation.required'),
      i18n.t('global.validation.passwordMin'),
      i18n.t('global.validation.passwordMax')
    ),
  });
