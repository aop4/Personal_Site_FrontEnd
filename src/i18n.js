import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './i18n/translations/en';
import es from './i18n/translations/es';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: en,
      es: es
    },
    debug: false
  });

export default i18n;