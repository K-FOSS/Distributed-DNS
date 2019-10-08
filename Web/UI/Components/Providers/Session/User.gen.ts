import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
export const CurrentUserFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CurrentUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CurrentUser"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"roles"},"arguments":[],"directives":[]}]}}]};export type CurrentUserFragment = (
  { __typename?: 'CurrentUser' }
  & Pick<Types.CurrentUser, 'username' | 'id' | 'roles'>
);
