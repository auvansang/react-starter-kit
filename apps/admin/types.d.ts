// import { resources, defaultNS } from './src/i18n';

// react-i18next versions higher than 11.11.0
// declare module '@sa/i18n' {
//   interface CustomTypeOptions {
//     defaultNS: typeof defaultNS;
//     resources: typeof resources['en'];
//   }
// }

declare namespace NodeJS {
  interface ProcessEnv {
    readonly AUTHORITY: string;
    readonly CLIENT_ID: string;
    readonly CLIENT_SECRET?: string;
    readonly REDIRECT_URI: string;
    readonly POST_LOGOUT_REDIRECT_URI: string;
    readonly SILENT_REDIRECT_URI: string;
    readonly SCOPES: string;
  }
}
