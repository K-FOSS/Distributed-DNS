// Web/UI/Routes/Zones/Zones/index.tsx
import React, { useCallback } from 'react';
import { useZonesPageQuery } from './ZonesPage.gen';
import { Header } from 'UI/Components/Styles/Header';
import { useHistory } from 'react-router';
import { Zone, Permission } from 'UI/GraphQL/graphqlTypes.gen';
import { useSnackbar } from 'notistack';
import MaterialTable from 'material-table';
import { useDeleteZoneMutation } from './DeleteZone.gen';

type ZoneData = Pick<Zone, 'id' | 'domainName' | 'userPermissions'>;

type RowClick<T> = (
  event?: React.MouseEvent,
  rowData?: T,
  toggleDetailPanel?: (panelIndex?: number) => void,
) => void;

export default function ZonesPage(): React.ReactElement {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useZonesPageQuery();
  const [deleteZone] = useDeleteZoneMutation();

  const handleRowClick: RowClick<ZoneData> = useCallback(
    (a, rowData) => rowData && history.push(`/Zones/${rowData.id}`),
    [history],
  );

  const handleRowDelete = useCallback(
    async (rowData: ZoneData) => {
      const response = await deleteZone({
        variables: {
          zoneId: rowData.id,
        },
      });

      if (response.data?.deleteZone)
        enqueueSnackbar('Zone successfully deleted', { variant: 'success' });
      else {
        console.error(`GraphQL Response: `, response);
        enqueueSnackbar('Error occurred during Zone deletion', {
          variant: 'error',
        });
      }
      console.log(`Deleting Zone ${rowData.id}`);
    },
    [enqueueSnackbar, deleteZone],
  );

  const isDeletable = useCallback(
    (rowData: ZoneData) => rowData.userPermissions.includes(Permission.Admin),
    [],
  );

  return (
    <>
      <Header title={{ primary: 'Zones' }} />
      <MaterialTable
        title='Zones'
        style={{ margin: '1em' }}
        columns={[{ title: 'Domain', field: 'domainName' }]}
        data={data?.currentUser?.zones || []}
        onRowClick={handleRowClick}
        editable={{
          isDeletable,
          onRowDelete: handleRowDelete,
        }}
      />
    </>
  );
}
