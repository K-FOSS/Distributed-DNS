// Web/UI/Components/Providers/Session/useToken.ts
import { useCookies } from 'react-cookie';
import { useCallback } from 'react';

// TODO: Refresh tokens
type SessionToken = string;

type SetToken = (newToken: SessionToken) => void;
type DeleteToken = () => void;

type UseToken = {
  token: SessionToken;
  setToken: SetToken;
  deleteToken: DeleteToken;
};

export function useToken(): UseToken {
  const [cookies, setCookieToken, deleteCookieToken] = useCookies();

  const setToken: SetToken = useCallback(
    (newToken) => setCookieToken('token', newToken, { path: '/' }),
    [setCookieToken],
  );

  const deleteToken: DeleteToken = useCallback(
    () => deleteCookieToken('token'),
    [deleteCookieToken],
  );

  return { token: cookies.token, setToken, deleteToken };
}
