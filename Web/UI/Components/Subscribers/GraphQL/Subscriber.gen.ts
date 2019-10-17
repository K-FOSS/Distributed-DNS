import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const SubscriberDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Subscriber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subscriberId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscriber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subscriberId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subscriberId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"subscribedZones"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"domainName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]}}]};

    export function useSubscriberQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SubscriberQuery, SubscriberQueryVariables>) {
      return ApolloReactHooks.useQuery<SubscriberQuery, SubscriberQueryVariables>(SubscriberDocument, baseOptions);
    }
      export function useSubscriberLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SubscriberQuery, SubscriberQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<SubscriberQuery, SubscriberQueryVariables>(SubscriberDocument, baseOptions);
      }
      
export type SubscriberQueryHookResult = ReturnType<typeof useSubscriberQuery>;
export type SubscriberQueryResult = ApolloReactCommon.QueryResult<SubscriberQuery, SubscriberQueryVariables>;export type SubscriberQueryVariables = {
  subscriberId: Types.Scalars['ID']
};


export type SubscriberQuery = (
  { __typename?: 'Query' }
  & { subscriber: (
    { __typename?: 'Subscriber' }
    & Pick<Types.Subscriber, 'id' | 'name'>
    & { subscribedZones: Array<(
      { __typename?: 'Zone' }
      & Pick<Types.Zone, 'domainName' | 'id'>
    )> }
  ) }
);
