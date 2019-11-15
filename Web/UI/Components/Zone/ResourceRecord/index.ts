// Web/UI/Components/Zone/ResourceRecord/index.ts
import { ResourceRecord } from 'UI/GraphQL/graphqlTypes.gen';

export type RRData = Pick<
  ResourceRecord,
  'id' | 'host' | 'data' | 'type' | 'ttl'
>;
