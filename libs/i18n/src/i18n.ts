import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';

const createI18n = (
  resources: Resource,
  fallbackLng: string,
  supportedLngs?: string[],
  defaultNS?: string
) => {
  i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      resources,
      fallbackLng,
      supportedLngs,
      defaultNS,

      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
    });

  return i18n;
};

export default createI18n;
