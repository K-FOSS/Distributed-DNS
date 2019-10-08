// Web/UI/Components/Zones/Table/Row/index.tsx
import React from 'react';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import { useHistory } from 'react-router';
import { Zone } from 'UI/GraphQL/graphqlTypes.gen';

interface TableRowProps extends Omit<Table.DataRowProps, 'row'> {
  row: Pick<Zone, 'domainName' | 'id'>;
}

export function TableRow({ row, ...props }: TableRowProps): React.ReactElement {
  const history = useHistory();

  return (
    <Table.Row
      row={row}
      hover
      onClick={() => history.push(`/Zones/${row.id}`)}
      {...props}
    />
  );
}
