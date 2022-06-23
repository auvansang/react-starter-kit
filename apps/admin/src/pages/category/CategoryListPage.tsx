import { observer } from '@sa/store';
import { useEffect } from 'react';
import { useRootStore } from 'stores';

const CategoryListPage = () => {
  const { categoryStore } = useRootStore();

  useEffect(() => {
    categoryStore.getAsync();
  }, []);

  return (
    <ul>
      {categoryStore.items.map((item, index) => (
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  );
};

export default observer(CategoryListPage);
