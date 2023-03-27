import * as Yup from 'yup';

export const countryCode = (requiredMsg: string) =>
  Yup.string().required(requiredMsg);

export const phoneNumber = (requiredMsg: string, phoneMsg: string) =>
  Yup.string()
    .matches(/^[0]?(\d{1})?(\d{2})[- ]?(\d{3})[- ]?(\d{4})$/, phoneMsg)
    .required(requiredMsg);

export const email = (emailMsg: string, requiredMsg: string) =>
  Yup.string().email(emailMsg).required(requiredMsg);

export const password = (requiredMsg: string, minMsg: string, maxMsg: string) =>
  Yup.string().min(6, minMsg).max(15, maxMsg).required(requiredMsg);

export const passwordConfirmation = (matchMsg: string, requiredMsg: string) =>
  Yup.string()
    .oneOf([Yup.ref('password')], matchMsg)
    .required(requiredMsg);
