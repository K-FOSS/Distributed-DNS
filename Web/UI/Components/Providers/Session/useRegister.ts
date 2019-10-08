// Web/UI/Components/Providers/Session/useRegister.ts
import { useRegisterMutation, RegisterMutationResult } from './register.gen';
import { RegisterInput } from 'UI/GraphQL/graphqlTypes.gen';
import { useToken } from './useToken';
import { useCallback } from 'react';

type RegisterFunction = (input: RegisterInput) => Promise<boolean>;

export function useRegister(): [RegisterFunction, RegisterMutationResult] {
  const { setToken } = useToken();

  const [registerFn, extras] = useRegisterMutation();

  const register: RegisterFunction = useCallback(
    async (input) => {
      const response = await registerFn({ variables: { input } });

      if (response.data && response.data.register) {
        setToken(response.data.register.token);
        return true;
      } else {
        return false;
      }
    },
    [registerFn, setToken],
  );

  return [register, extras];
}
