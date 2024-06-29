import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

import he from './he';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    he: {
      translation: he,
    },
  },
  lng: I18nManager.isRTL ? 'he' : 'he',
  keySeparator: false, // we do not use keys in form messages.welcome

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
