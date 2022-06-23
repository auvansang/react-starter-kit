import { addMiddleware } from 'mobx-state-tree';
import { connectReduxDevtools, actionLogger } from 'mst-middlewares';

const configureStore = <StoreInstance>(store: StoreInstance) => {
  if (process.env.NODE_ENV === 'development') {
    addMiddleware(store, actionLogger);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    connectReduxDevtools(require('remotedev'), store);
  }
};

export default configureStore;
