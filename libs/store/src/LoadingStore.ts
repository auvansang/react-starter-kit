import { guid } from '@sa/utils';
import { applySnapshot, Instance, types } from 'mobx-state-tree';

import LoadingModel from './models/LoadingModel';

const LoadingStore = types
  .model('Loading Store', {
    loadingItems: types.array(LoadingModel),
  })
  .views((self) => ({
    get isLoading() {
      return self.loadingItems.some((x) => x.loading);
    },
    isLoaded(id: string) {
      return self.loadingItems.find((x) => x.id !== id) != null;
    },
  }))
  .actions((self) => {
    const load = (notes?: string) => {
      const id = guid();

      applySnapshot(self.loadingItems, [
        ...self.loadingItems,
        {
          id,
          loading: true,
          notes,
        },
      ]);

      return id;
    };

    const loaded = (id: string) => {
      applySnapshot(
        self.loadingItems,
        self.loadingItems.filter((x) => x.id !== id)
      );
    };

    const cleanup = () => {
      applySnapshot(self.loadingItems, []);
    };

    return {
      load,
      loaded,
      cleanup,
    };
  });

export default LoadingStore;
export type LoadingStoreInstance = Instance<typeof LoadingStore>;
