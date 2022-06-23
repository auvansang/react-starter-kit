import { createI18n } from '@sa/i18n';

import commonEN from './locales/en/common.json';
import commonVI from './locales/vi/common.json';

export const fallbackLng = 'en';
export const defaultNS = 'common';
export const supportedLngs = ['en', 'vi'];
export const resources = {
  en: {
    common: commonEN,
  },
  vi: {
    common: commonVI,
  },
};

const i18n = createI18n(resources, fallbackLng, supportedLngs, defaultNS);

export default i18n;
