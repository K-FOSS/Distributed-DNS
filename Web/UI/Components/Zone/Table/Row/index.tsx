// Web/UI/Components/Zone/Table/Row/index.tsx
import React from 'react';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import { Zone, ResourceRecord } from 'UI/GraphQL/graphqlTypes.gen';

interface TableRowProps extends Omit<Table.DataRowProps, 'row'> {
  row: Pick<Zone, 'id' | 'domainName'> & {
    resourceRecords: Array<
      { __typename?: 'ResourceRecord' } & Pick<
        ResourceRecord,
        'id' | 'host' | 'data' | 'type'
      >
    >;
  };
}

export function TableRow({ row, ...props }: TableRowProps): React.ReactElement {
  return <Table.Row row={row} hover {...props} />;
}
