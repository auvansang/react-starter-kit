import { useEffect, useState, MouseEvent } from 'react';
import { Stack, Typography, Button, Box } from '@mui/material';

import env from 'env';

const LOGOUT_ID_PARAM = '?logoutId=';
const LOGOUT_ID_PARAM_LENGTH = LOGOUT_ID_PARAM.length;

const LogoutPage = () => {
  const [logoutId, setLogoutId] = useState('');
  const [prompt, setPrompt] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');
  const [postLogoutRedirectUri, setPostLogoutRedirectUri] = useState('');

  useEffect(() => {
    const logoutIdIdx = window.location.href.indexOf(LOGOUT_ID_PARAM);

    if (logoutIdIdx > 0) {
      const logoutIdParam = window.location.href.substring(logoutIdIdx + LOGOUT_ID_PARAM_LENGTH);

      setLogoutId(logoutIdParam);
    }

    getLogoutInfo();
  }, [window.location.href]);

  const getLogoutInfo = async () => {
    try {
      const response = await fetch(`${env.authority}/api/v1/auth/logout?logoutId=${logoutId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.status == 200) {
        const data = await response.json();
        console.log('response: ', data);

        setPrompt(data.prompt);

        if (!data.prompt) {
          setIframeUrl(data.iframeUrl);
          setPostLogoutRedirectUri(data.postLogoutRedirectUri);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPrompt(false);

    try {
      const response = await fetch(`${env.authority}/api/v1/auth/logout?logoutId=${logoutId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.status == 200) {
        const data = await response.json();
        console.log('response: ', data);

        setIframeUrl(data.iframeUrl);
        setPostLogoutRedirectUri(data.postLogoutRedirectUri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack direction="column" spacing={1} sx={{ mb: 4 }}>
      <Typography variant="body1" color="primary">
        Sign Out
      </Typography>
      {prompt && (
        <>
          <Typography variant="h5" color="primary">
            Would you like to logout?
          </Typography>

          <form>
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </form>
        </>
      )}
      {!prompt && (
        <>
          <Typography variant="h5" color="primary">
            You are now logged out!
          </Typography>
          {!!postLogoutRedirectUri && (
            <Typography variant="h6" color="primary">
              Click <a href={postLogoutRedirectUri}>here</a> to return to the application.
            </Typography>
          )}
          {!!iframeUrl && (
            <Box
              sx={{
                display: 'none',
                visibility: 'hidden',
                h: 0,
                w: 0,
                p: 0,
                m: 0,
              }}
              dangerouslySetInnerHTML={{
                __html: `<iframe src=${iframeUrl} title="Logout" />`,
              }}
            />
          )}
        </>
      )}
    </Stack>
  );
};

export default LogoutPage;
