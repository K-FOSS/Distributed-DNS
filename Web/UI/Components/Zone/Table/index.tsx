// Web/UI/Components/Zone/Table/index.tsx
import MaterialTable from 'material-table';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { ResourceRecordType } from 'UI/GraphQL/graphqlTypes.gen';
import { useCreateValueRrMutation } from '../GraphQL/CreateValueRR.gen';
import { useDeleteResourceRecordMutation } from '../GraphQL/DeleteResourceRecord.gen';
import { useUpdateResourceRecordMutation } from '../GraphQL/UpdateValueResourceRecord.gen';
import { useZoneQuery } from '../GraphQL/Zone.gen';
import { RREditComponent } from '../ResourceRecord/EditComponent';
import { ResourceRecordSelect } from '../ResourceRecord/Select';
import { RRData } from '../ResourceRecord';
import { RRDataColumn } from '../ResourceRecord/DataColumn';

interface ZoneTableProps {
  zoneId: string;
}

export function ZoneTable({ zoneId }: ZoneTableProps): React.ReactElement {
  const { data } = useZoneQuery({ variables: { zoneId } });
  const [createValueRR] = useCreateValueRrMutation();
  const [deleteResourceRecord] = useDeleteResourceRecordMutation();
  const [updateValueResourceRecord] = useUpdateResourceRecordMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleAddResourceRecord = useCallback(
    async ({ data, ttl, ...input }) => {
      if (input.type === ResourceRecordType.Mx) {
        console.log('MX Record');
      } else {
        const response = await createValueRR({
          variables: {
            zoneId,
            input: {
              ...input,
              ttl: ttl ? parseInt(ttl) : undefined,
              value: JSON.parse(data).value,
            },
          },
        });
        console.log(response);
      }
    },
    [zoneId, createValueRR],
  );

  const handleResourceRecordChanges = useCallback(
    async ({ id, type, data, host, ttl }: RRData) => {
      if (type === ResourceRecordType.Mx) {
      }

      const { value } = JSON.parse(data);
      const response = await updateValueResourceRecord({
        variables: {
          resourceRecordId: id,
          input: {
            value,
            host,
            ttl: ttl ? parseInt(ttl as string) : undefined,
          },
        },
      });
      if (response.data)
        enqueueSnackbar('Successfully updated resource record', {
          variant: 'success',
        });
    },
    [updateValueResourceRecord, enqueueSnackbar],
  );

  const handleDeleteResourceRecord = useCallback(
    async ({ id }: RRData) => {
      const response = await deleteResourceRecord({
        variables: { resourceRecordId: id },
      });
      if (response.data)
        enqueueSnackbar('Resource record deleted successfully', {
          variant: 'success',
        });
    },
    [deleteResourceRecord, enqueueSnackbar],
  );

  return (
    <>
      <MaterialTable
        title={data && data.zone ? data.zone.domainName : 'Zone RRs'}
        style={{ margin: '1em' }}
        columns={[
          {
            title: 'Type',
            field: 'type',
            editComponent: ResourceRecordSelect,
            editable: 'onAdd',
            initialEditValue: ResourceRecordType.A,
          },
          { title: 'Host', field: 'host' },
          {
            title: 'Data',
            field: 'data',
            render: RRDataColumn,
            editComponent: RREditComponent,
          },
          {
            title: 'TTL',
            field: 'ttl',
            type: 'numeric',
          },
        ]}
        data={
          data && data.zone.resourceRecords ? data.zone.resourceRecords : []
        }
        editable={{
          onRowAdd: handleAddResourceRecord,
          onRowDelete: handleDeleteResourceRecord,
          onRowUpdate: handleResourceRecordChanges,
        }}
      />
    </>
  );
}
