import { SnapshotIn, types } from '@sa/store';

export const AuthSettingsModel = types.model('Auth User', {
  authority: types.string,
  clientId: types.string,
  clientSecret: types.maybe(types.string),
  redirectUrl: types.string,
  silentRedirectUrl: types.string,
  postLogoutUrl: types.string,
  scopes: types.string,
  storePrefix: types.optional(types.string, '@sa/'),
});

export interface AuthSettings extends SnapshotIn<typeof AuthSettingsModel> {}
