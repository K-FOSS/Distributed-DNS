import { CurrentUserFragment } from './User.gen';
import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const CurrentUserDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentUser"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CurrentUser"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CurrentUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CurrentUser"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"roles"},"arguments":[],"directives":[]}]}}]};

    export function useCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
      return ApolloReactHooks.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
    }
      export function useCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
      
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserQueryResult = ApolloReactCommon.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;export type CurrentUserQueryVariables = {};


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: Types.Maybe<{ __typename?: 'CurrentUser' }
    & CurrentUserFragment
  > }
);
