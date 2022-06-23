import { IModelType, ModelProperties, onSnapshot } from 'mobx-state-tree';

import configureStore from './configureStore';

const createStore = <TStore extends IModelType<ModelProperties, unknown>>(
  store: TStore,
  initialValue?: Record<string, unknown>,
  env?: Record<string, unknown>
) => {
  let initialState = {} as TStore['Type'];
  let shouldCreateStore = true;

  if (localStorage) {
    const snapshotState = localStorage.getItem(store.name);

    if (snapshotState) {
      const json = JSON.parse(snapshotState);

      if (store.is(json)) {
        initialState = store.create(json, env);
        shouldCreateStore = false;
      }
    }
  }

  if (shouldCreateStore) {
    initialState = store.create(initialValue, env);
  }

  configureStore(initialState);

  onSnapshot(initialState, (snapshot) => {
    localStorage.setItem(store.name, JSON.stringify(snapshot));
  });

  return initialState;
};

export default createStore;
