// Web/UI/Components/Providers/Session/useLogin.ts
import { useLoginMutation, LoginMutationResult } from './login.gen';
import { LoginInput } from 'UI/GraphQL/graphqlTypes.gen';
import { useCallback } from 'react';
import { useToken } from './useToken';

type LoginFunction = (input: LoginInput) => Promise<boolean>;

export function useLogin(): [LoginFunction, LoginMutationResult] {
  const { setToken } = useToken();
  const [loginFn, extras] = useLoginMutation({
    context: { ignoreError: true },
  });
  const login: LoginFunction = useCallback(
    async (input) => {
      const response = await loginFn({ variables: { input } });
      if (response.data && response.data.login) {
        setToken(response.data.login.token);
        return true;
      } else {
        return false;
      }
    },
    [loginFn, setToken],
  );

  return [login, extras];
}
