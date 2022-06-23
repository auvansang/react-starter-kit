interface Environment extends EnvironmentBase {
  baseApiUrl: string;
  auth: {
    authority: string;
    clientId: string;
    clientSecret?: string;
    redirectUri: string;
    postLogoutRedirectUri: string;
    silentRedirectUri: string;
    scopes: string;
    storePrefix: string;
  };
}

const env: Environment = {
  nodeEnv: process.env.NODE_ENV,
  appEnv: process.env.ENV,
  version: process.env.VERSION ?? '0.0.0',
  baseApiUrl: process.env.BASE_API_URL ?? '',
  auth: {
    authority: process.env.AUTHORITY ?? '',
    clientId: process.env.CLIENT_ID ?? '',
    clientSecret: process.env.CLIENT_SECRET ?? '',
    redirectUri: process.env.REDIRECT_URI ?? '',
    postLogoutRedirectUri: process.env.POST_LOGOUT_REDIRECT_URI ?? '',
    silentRedirectUri: process.env.SILENT_REDIRECT_URI ?? '',
    scopes: process.env.SCOPES ?? 'openid profile email',
    storePrefix: process.env.STORE_PREFIX ?? '@sa/',
  },
};

export default env;
