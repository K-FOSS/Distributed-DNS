// Web/UI/Utils/useApolloErrors.ts
import { ApolloError } from 'apollo-client';
import { useMemo } from 'react';

export interface ValidationError {
  field: string;
  errorMessage: string;
}

export function useApolloErrors(
  error?: ApolloError,
): ValidationError | undefined {
  return useMemo(() => {
    if (!error) return;
    for (const graphQLError of error.graphQLErrors) {
      if (
        graphQLError.message !== 'Argument Validation Error' ||
        !graphQLError.extensions ||
        !graphQLError.extensions.exception ||
        !graphQLError.extensions.exception.validationErrors
      ) {
        continue;
      }
      for (const error of graphQLError.extensions.exception.validationErrors)
        return {
          field: error!.property,
          errorMessage: error!.constraints.isValid,
        };
    }
  }, [error]);
}

//
