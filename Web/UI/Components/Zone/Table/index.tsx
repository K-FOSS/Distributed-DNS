// Web/UI/Components/Zone/Table/index.tsx
import MaterialTable from 'material-table';
import { useSnackbar } from 'notistack';
import React, { useCallback, useMemo } from 'react';
import { ResourceRecordType, Permission } from 'UI/GraphQL/graphqlTypes.gen';
import { useCreateValueRrMutation } from '../GraphQL/CreateValueRR.gen';
import { useDeleteResourceRecordMutation } from '../GraphQL/DeleteResourceRecord.gen';
import { useUpdateResourceRecordMutation } from '../GraphQL/UpdateValueResourceRecord.gen';
import { useZoneQuery } from '../GraphQL/Zone.gen';
import { RREditComponent } from '../ResourceRecord/EditComponent';
import { ResourceRecordSelect } from '../ResourceRecord/Select';
import { RRData } from '../ResourceRecord';
import { RRDataColumn } from '../ResourceRecord/DataColumn';
import { Loader } from 'UI/Components/Styles/Loader';
import { useImport } from 'UI/Components/Providers/ImportProvider';
import { useCreateMxrrMutation } from '../GraphQL/CreateMXRR.gen';
import { useUpdateMxResourceRecordMutation } from '../GraphQL/UpdateMXResourceRecord.gen';

interface ZoneTableProps {
  zoneId: string;
}

export function ZoneTable({ zoneId }: ZoneTableProps): React.ReactElement {
  const { data } = useZoneQuery({ variables: { zoneId } });
  const [createValueRR] = useCreateValueRrMutation();
  const [createMXRR] = useCreateMxrrMutation();
  const [deleteResourceRecord] = useDeleteResourceRecordMutation();
  const [updateValueResourceRecord] = useUpdateResourceRecordMutation();
  const [updateMXResourceRecord] = useUpdateMxResourceRecordMutation();
  const { enqueueSnackbar } = useSnackbar();

  const userZonePermissions = useMemo(
    () => (data ? data.zone.userPermissions : [Permission.Read]),
    [data],
  );

  const TextField = useImport({
    imported: import(
      'UI/Components/Styles/Inputs/TextField/BaseTextField/index'
    ),
    path: 'Components/Styles/Inputs/TextField/BaseTextField/index.tsx',
    // TODO: TextField Skeleton Loader
    Loader,
  });

  const handleAddResourceRecord = useCallback(
    async ({ data, ttl, ...input }) => {
      if (input.type === ResourceRecordType.Mx) {
        console.log('MX Record');

        const { preference, value } = JSON.parse(data);
        const response = await createMXRR({
          variables: {
            zoneId,
            input: {
              host: input.host,
              ttl: ttl ? parseInt(ttl) : undefined,
              preference: parseInt(preference),
              value,
            },
          },
        });

        console.log(preference, value);
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
    [zoneId, createValueRR, createMXRR],
  );

  const handleResourceRecordChanges = useCallback(
    async ({ id, type, data, host, ttl }: RRData) => {
      if (type === ResourceRecordType.Mx) {
        const { preference, value } = JSON.parse(data);

        console.log(data);

        const response = await updateMXResourceRecord({
          variables: {
            resourceRecordId: id,
            input: {
              value,
              preference: parseInt(preference),
              host,
              ttl: ttl,
            },
          },
        });

        if (response.data)
          enqueueSnackbar('Successfully updated resource record', {
            variant: 'success',
          });
      } else {
        const { value } = JSON.parse(data);
        const response = await updateValueResourceRecord({
          variables: {
            resourceRecordId: id,
            input: {
              value,
              host,
              ttl: ttl,
            },
          },
        });
        if (response.data)
          enqueueSnackbar('Successfully updated resource record', {
            variant: 'success',
          });
      }
    },
    [updateValueResourceRecord, enqueueSnackbar, updateMXResourceRecord],
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
          {
            title: 'Host',
            field: 'host',
            editComponent: ({ onChange, ...props }) => (
              <TextField
                label='Host'
                variant='outlined'
                onChange={({ target }) => onChange(target.value)}
                {...props}
              />
            ),
          },
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
            editComponent: ({ onChange, ...props }) => (
              <TextField
                label='TTL'
                variant='outlined'
                onChange={({ target }) => onChange(parseInt(target.value))}
                {...props}
              />
            ),
          },
        ]}
        data={
          data && data.zone.resourceRecords ? data.zone.resourceRecords : []
        }
        editable={{
          onRowAdd: userZonePermissions.includes(Permission.Write)
            ? handleAddResourceRecord
            : undefined,
          onRowDelete: userZonePermissions.includes(Permission.Write)
            ? handleDeleteResourceRecord
            : undefined,
          onRowUpdate: userZonePermissions.includes(Permission.Write)
            ? handleResourceRecordChanges
            : undefined,
        }}
      />
    </>
  );
}
