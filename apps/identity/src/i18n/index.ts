import { createI18n } from '@sa/i18n';

import authEN from './locales/en/auth.json';
import authVI from './locales/vi/auth.json';

export const fallbackLng = 'en';
export const defaultNS = 'common';
export const supportedLngs = ['en', 'vi'];
export const resources = {
  en: {
    auth: authEN,
  },
  vi: {
    auth: authVI,
  },
};

const i18n = createI18n(resources, fallbackLng, supportedLngs, defaultNS);

export default i18n;
