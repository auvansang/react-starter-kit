import { useEffect } from 'react';

import { observer } from '@sa/store';

import { useRootStore } from 'stores';

const SigninCallbackPage = () => {
  const { authStore } = useRootStore();

  useEffect(() => {
    (async () => {
      await authStore.signinCallbackAsync(window.location.href);
    })();
  }, []);

  return null;
};

export default observer(SigninCallbackPage);
