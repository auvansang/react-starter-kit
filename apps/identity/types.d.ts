/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly AUTHORITY: string;
  }
}

// declare module '@sa/i18n' {
//   interface CustomTypeOptions {
//     defaultNS: typeof import('./src/i18n').defaultNS;
//     resources: typeof import('./src/i18n').resources['en'];
//   }
// }
