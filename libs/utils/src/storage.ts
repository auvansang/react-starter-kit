const storage = (store = localStorage) => {
  const get = (key: string) => {
    return store.getItem(key) ?? '';
  };

  const set = (key: string, value: string) => {
    store.setItem(key, value);
  };

  const remove = (key: string) => {
    store.removeItem(key);
  };

  return { get, set, remove };
};

export default storage();
