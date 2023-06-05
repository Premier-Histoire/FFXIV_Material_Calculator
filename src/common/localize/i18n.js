import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from './translation.en';
import translationJa from './translation.ja';

const resources = {
  ja: {
    translation: translationJa,
  },
  en: {
    translation: translationEn,
  },
};

i18n.use(initReactI18next).init({
  resources: resources,
  fallbackLng: 'ja',
  debug: false,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
