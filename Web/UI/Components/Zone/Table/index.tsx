// Web/UI/Components/Zone/Table/index.tsx
import { Grid, Table, Toolbar } from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { RRTypeProvider } from 'UI/Components/ResourceRecords/RRTypeProvider';
import { useZoneQuery } from '../GraphQL/Zone.gen';
import { TableRow } from './Row';

interface ZoneTableProps {
  zoneId: string
}

export function ZoneTable({ zoneId }: ZoneTableProps): React.ReactElement {
  const { data } = useZoneQuery({ variables: { zoneId } })

  return (
    <Paper style={{ margin: '1em' }}>
    <Grid rows={data?.zone.resourceRecords || []} columns={[{ name: 'host', title: 'Host' }, { name: 'type', title: 'Type'  }, { name: 'data', title: 'Data'  }]}>
      <RRTypeProvider for={['data']} />
      <Table rowComponent={TableRow} />
      <Toolbar />
    </Grid>
  </Paper>
  )
}