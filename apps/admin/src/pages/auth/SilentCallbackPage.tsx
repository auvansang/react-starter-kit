import { useEffect } from 'react';

import { observer } from '@sa/store';

import { useRootStore } from 'stores';

const SilentCallbackPage = () => {
  const { authStore } = useRootStore();

  useEffect(() => {
    (async () => {
      await authStore.signinSilentCallbackAsync(window.location.href);
    })();
  }, []);

  return null;
};

export default observer(SilentCallbackPage);
