import i18n from 'i18next';

import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';

import Constants from './constants';

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

i18n.init({
  resources,
  lng: Constants.defaultLang,
  keySeparator: '.', // we do not use keys in form messages.welcome
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
