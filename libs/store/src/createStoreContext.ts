import { createContext, useContext } from 'react';

const createStoreContext = <StoreInstance>(): [
  React.Provider<StoreInstance | null>,
  () => StoreInstance
] => {
  const StoreContext = createContext<StoreInstance | null>(null);
  const StoreProvider = StoreContext.Provider;

  const useStore = (): StoreInstance => {
    const store = useContext(StoreContext);

    if (store == null) {
      throw new Error('Store cannot be null, please add a context provider');
    }

    return store;
  };

  return [StoreProvider, useStore];
};

export default createStoreContext;
