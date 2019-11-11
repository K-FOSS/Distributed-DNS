// Web/UI/Components/Zone/ResourceRecord/DataColumn/index.tsx
import React from 'react';
import { RRData } from '..';
import { ResourceRecordType } from 'UI/GraphQL/graphqlTypes.gen';
import { ValueResourceRecord } from './ValueRecord';
import { MXResourceRecord } from './MXRecord';

const RRDataColumnComponent = {
  [ResourceRecordType.A]: ValueResourceRecord,
  [ResourceRecordType.Aaaa]: ValueResourceRecord,
  [ResourceRecordType.Cname]: ValueResourceRecord,
  [ResourceRecordType.Dname]: ValueResourceRecord,
  [ResourceRecordType.Mx]: MXResourceRecord,
  [ResourceRecordType.Ns]: ValueResourceRecord,
  [ResourceRecordType.Txt]: ValueResourceRecord,
};

export function RRDataColumn(
  props: RRData,
  type: 'row' | 'group',
): React.ReactElement {
  const Component = RRDataColumnComponent[props.type];
  return <Component JSONData={props.data} />;
}
