import { AuthStore, createAuthStore } from '@sa/auth';
import {
  createHttpInstance,
  type HttpInstance,
  applyRequestHeadersInterceptor,
  applyTransformResponseInterceptor,
} from '@sa/http';
import { types, LoadingStore, Instance, createStore, createStoreContext } from '@sa/store';
import env from 'env';
import CategoryStore from './category/CategoryStore';

const RootStore = types.model('Root Store', {
  authStore: AuthStore,
  loadingStore: LoadingStore,
  categoryStore: CategoryStore,
});

type RootStoreInstance = Instance<typeof RootStore>;
type RootStoreEnv = {
  http: HttpInstance;
};

const http = createHttpInstance(env.baseApiUrl);

applyRequestHeadersInterceptor(http, async () =>
  Promise.resolve({
    'Content-Type': 'application/json',
    'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    'Accept-Language': Intl.DateTimeFormat().resolvedOptions().locale,
  })
);

applyTransformResponseInterceptor(http);

const rootStoreEnv: RootStoreEnv = {
  http,
};

const initialRootState = createStore(
  RootStore,
  {
    authStore: createAuthStore({
      authority: env.auth.authority,
      clientId: env.auth.clientId,
      clientSecret: env.auth.clientSecret,
      redirectUrl: env.auth.redirectUri,
      silentRedirectUrl: env.auth.silentRedirectUri,
      postLogoutUrl: env.auth.postLogoutRedirectUri,
      scopes: env.auth.scopes,
      storePrefix: env.auth.storePrefix,
    }),
    loadingStore: LoadingStore.create(),
    categoryStore: CategoryStore.create(),
  },
  rootStoreEnv
);

const [RootStoreProvider, useRootStore] = createStoreContext<RootStoreInstance>();

export {
  type RootStoreInstance,
  type RootStoreEnv,
  initialRootState,
  RootStoreProvider,
  useRootStore,
};
