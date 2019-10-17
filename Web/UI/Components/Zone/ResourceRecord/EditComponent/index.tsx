// Web/UI/Components/Zone/ResourceRecord/EditComponent/index.ts
import { EditComponentProps } from 'material-table';
import React, { useMemo } from 'react';
import { ResourceRecordType } from 'UI/GraphQL/graphqlTypes.gen';
import { RRData } from '..';
import { MXEditComponent } from './MXComponent';
import { ValueEditComponent } from './ValueComponent';

const RREditTypes = {
  [ResourceRecordType.A]: ValueEditComponent,
  [ResourceRecordType.Aaaa]: ValueEditComponent,
  [ResourceRecordType.Cname]: ValueEditComponent,
  [ResourceRecordType.Dname]: ValueEditComponent,
  [ResourceRecordType.Mx]: MXEditComponent,
  [ResourceRecordType.Ns]: ValueEditComponent,
  [ResourceRecordType.Txt]: ValueEditComponent,
};

export function RREditComponent({
  rowData,
  value,
  onChange,
}: EditComponentProps<RRData>): React.ReactElement {
  const Component = useMemo(() => RREditTypes[rowData.type], [rowData]);

  if (!Component) return <></>;

  return <Component value={value} onChange={onChange} /> || <></>;
}
