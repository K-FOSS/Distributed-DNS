// Web/UI/Components/Zones/Table/index.tsx
import { Grid, Table, TableHeaderRow, Toolbar } from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { useZonesQuery } from '../GraphQL/Zones.gen';
import { TableRow } from './Row';

export function ZonesTable(): React.ReactElement {
  const { data } = useZonesQuery()

  return (
    <Paper style={{ margin: '1em' }}>
    <Grid rows={data?.zones || []} columns={[{ name: 'domainName', title: 'Domain' }]}>
      <Table rowComponent={TableRow} />
      <TableHeaderRow />
      <Toolbar />
    </Grid>
  </Paper>
  )
}