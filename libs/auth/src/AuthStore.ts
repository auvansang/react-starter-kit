import { User, UserManager, UserProfile, WebStorageStateStore } from 'oidc-client-ts';

import { types, flow, applySnapshot, Instance, createStore } from '@sa/store';

import { AuthSettings, AuthSettingsModel } from './models/AuthSettingsModel';
import { AuthUserModel } from './models/AuthUserModel';

export const AuthStore = types
  .model('Auth Store', {
    idToken: types.optional(types.string, ''),
    accessToken: types.optional(types.string, ''),
    refreshToken: types.optional(types.string, ''),
    authUser: types.maybeNull(AuthUserModel),
    authSettings: AuthSettingsModel,
  })
  .views((self) => ({
    isAuthenticated() {
      return !!self.accessToken;
    },
  }))
  .actions((self) => {
    const oidc = new UserManager({
      authority: self.authSettings.authority,
      client_id: self.authSettings.clientId,
      client_secret: self.authSettings.clientSecret,
      redirect_uri: self.authSettings.redirectUrl,
      silent_redirect_uri: self.authSettings.silentRedirectUrl,
      post_logout_redirect_uri: self.authSettings.postLogoutUrl,
      scope: self.authSettings.scopes,
      response_type: 'code',
      response_mode: 'query',
      monitorSession: true,
      automaticSilentRenew: true,
      loadUserInfo: true,
      userStore: new WebStorageStateStore({
        prefix: self.authSettings.storePrefix,
        store: window.localStorage,
      }),
    });

    const internalLoadPreviousSessionAsync = flow(function* () {
      try {
        const user: User = yield oidc.getUser();

        if (!!user) {
          internalUpdateToken(user.id_token, user.access_token, user.refresh_token);
          internalUpdateUserProfile(user.profile);
        }
      } catch (error) {
        console.log(error);
      }
    });

    const internalUpdateToken = (idToken?: string, accessToken?: string, refreshToken?: string) => {
      applySnapshot(self, {
        ...self,
        idToken,
        accessToken,
        refreshToken,
      });
    };

    const internalUpdateUserProfile = (authUserProfile?: UserProfile) => {
      if (!authUserProfile) {
        applySnapshot(self, {
          ...self,
          authUser: null,
        });

        return;
      }

      applySnapshot(self, {
        ...self,
        authUser: {
          id: authUserProfile.sub,
          userName: authUserProfile.preferred_username ?? '',
          firstName: authUserProfile.given_name ?? '',
          lastName: authUserProfile.family_name ?? '',
          fullName: authUserProfile.name ?? '',
          // displayName: authUserProfile. ?? '',
          // birthDate: authUserProfile. ?? '',
          email: authUserProfile.email ?? '',
          emailConfirmed: authUserProfile.email_verified ?? false,
          phoneNumber: authUserProfile.phone_number ?? '',
          phoneNumberConfirmed: authUserProfile.phone_number_verified ?? false,
          // avatar: authUserProfile. ?? '',
          //   roles: authUserProfile.roles
          //   permissions: authUserProfile.permissions,
        },
      });
    };

    const signinAsync = flow(function* () {
      yield oidc.signinRedirect();
    });

    const signinCallbackAsync = flow(function* (url: string) {
      const user: User = yield oidc.signinCallback(url);

      internalUpdateToken(user.id_token, user.access_token, user.refresh_token);
      internalUpdateUserProfile(user.profile);
    });

    const signinSilentAsync = flow(function* () {
      try {
        const user: User = yield oidc.signinSilent();

        internalUpdateToken(user.id_token, user.access_token, user.refresh_token);
        internalUpdateUserProfile(user.profile);
      } catch {
        yield signoutAsync();
      }
    });

    const signinSilentCallbackAsync = flow(function* (url: string) {
      yield oidc.signinSilentCallback(url);
    });

    const signoutAsync = flow(function* () {
      yield oidc.signoutRedirect();
      yield oidc.removeUser();

      internalUpdateToken('', '', '');
      internalUpdateUserProfile();
    });

    oidc.events.addAccessTokenExpiring(signinSilentAsync);
    oidc.events.addAccessTokenExpired(signoutAsync);

    const afterCreate = () => {
      internalLoadPreviousSessionAsync();
    };

    return {
      afterCreate,
      signinAsync,
      signinCallbackAsync,
      signinSilentAsync,
      signinSilentCallbackAsync,
      signoutAsync,
    };
  });

export interface AuthStoreInstance extends Instance<typeof AuthStore> {}

export const createAuthStore = (authSettings: AuthSettings) =>
  createStore(AuthStore, {
    authSettings,
  });
