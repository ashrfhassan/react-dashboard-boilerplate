import * as Yup from 'yup';
import i18n from '../../i18n';
import { password, passwordConfirmation } from '../../validation';

export const profileChangePasswordFormSchema = () =>
  Yup.object().shape({
    currentPassword: password(
      i18n.t('global.validation.required'),
      i18n.t('global.validation.passwordMin'),
      i18n.t('global.validation.passwordMax')
    ),
    password: password(
      i18n.t('global.validation.required'),
      i18n.t('global.validation.passwordMin'),
      i18n.t('global.validation.passwordMax')
    ),
    confirmPassword: passwordConfirmation(
      i18n.t('global.validation.passwordMatch'),
      i18n.t('global.validation.required')
    ),
  });
