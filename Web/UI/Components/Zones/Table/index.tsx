// Web/UI/Components/Zones/Table/index.tsx
import MaterialTable from 'material-table';
import React, { useCallback } from 'react';
import { useZonesQuery } from '../GraphQL/Zones.gen';
import { useHistory } from 'react-router';
import { Zone } from 'UI/GraphQL/graphqlTypes.gen';

type RowClick<T> = (
  event?: React.MouseEvent,
  rowData?: T,
  toggleDetailPanel?: (panelIndex?: number) => void,
) => void;

type ZoneData = Pick<Zone, 'domainName' | 'id'>;

export function ZonesTable(): React.ReactElement {
  const history = useHistory();
  const { data } = useZonesQuery();

  const handleRowClick: RowClick<ZoneData> = useCallback(
    (a, rowData) => rowData && history.push(`/Zones/${rowData.id}`),
    [history],
  );

  return (
    <>
      <MaterialTable
        title='Zones'
        style={{ margin: '1em' }}
        columns={[{ title: 'Domain', field: 'domainName' }]}
        data={data && data.currentUser ? data.currentUser.zones : []}
        onRowClick={handleRowClick}
      />
    </>
  );
}
