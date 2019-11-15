// Web/UI/Components/Zone/Table/index.tsx
import MaterialTable from 'material-table';
import { useSnackbar } from 'notistack';
import React, { useCallback, useMemo } from 'react';
import {
  ResourceRecordType,
  Permission,
  ZoneQuery,
  Zone,
  ResourceRecord,
  ValueRecordType,
} from 'UI/GraphQL/graphqlTypes.gen';
import { useCreateValueRrMutation } from '../GraphQL/CreateValueRR.gen';
import { useDeleteResourceRecordMutation } from '../GraphQL/DeleteResourceRecord.gen';
import { useUpdateResourceRecordMutation } from '../GraphQL/UpdateValueResourceRecord.gen';
import { RREditComponent } from '../ResourceRecord/EditComponent';
import { ResourceRecordSelect } from '../ResourceRecord/Select';
import { RRData } from '../ResourceRecord';
import { RRDataColumn } from '../ResourceRecord/DataColumn';
import { Loader } from 'UI/Components/Styles/Loader';
import { useImport } from 'UI/Components/Providers/ImportProvider';
import { useCreateMxrrMutation } from '../GraphQL/CreateMXRR.gen';
import { useUpdateMxResourceRecordMutation } from '../GraphQL/UpdateMXResourceRecord.gen';
import { useCreateSrvrrMutation } from '../GraphQL/CreateSRVRR.gen';
import { useUpdateSrvResourceRecordMutation } from '../GraphQL/UpdateSRVResourceRecord.gen';

type ResourceRecordData = { __typename?: 'ResourceRecord' } & Pick<
  ResourceRecord,
  'id' | 'ttl' | 'host' | 'data' | 'type'
>;

type ZoneData =
  | (Pick<Zone, 'id' | 'domainName' | 'userPermissions'> & {
      resourceRecords: Array<ResourceRecordData>;
    })
  | undefined;

interface ZoneTableProps {
  zoneData: ZoneData;
}

export function ZoneTable({ zoneData }: ZoneTableProps): React.ReactElement {
  const [createValueRR] = useCreateValueRrMutation();
  const [createMXRR] = useCreateMxrrMutation();
  const [createSRV] = useCreateSrvrrMutation();
  const [deleteResourceRecord] = useDeleteResourceRecordMutation();
  const [updateValueResourceRecord] = useUpdateResourceRecordMutation();
  const [updateMXResourceRecord] = useUpdateMxResourceRecordMutation();
  const [updateSRVResourceRecord] = useUpdateSrvResourceRecordMutation();
  const { enqueueSnackbar } = useSnackbar();

  const userZonePermissions = useMemo(
    () => zoneData?.userPermissions || [Permission.Read],
    [zoneData],
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
    async ({ data, ttl, ...input }: ResourceRecordData) => {
      if (!zoneData?.id) {
        enqueueSnackbar('Error occurred. INVALID ZONE ID', {
          variant: 'error',
        });
        return;
      }

      if (input.type === ResourceRecordType.Mx) {
        const { preference, value } = JSON.parse(data);
        const response = await createMXRR({
          variables: {
            zoneId: zoneData.id,
            input: {
              host: input.host,
              ttl: ttl ? parseInt((ttl as unknown) as string) : undefined,
              preference: parseInt(preference),
              value,
            },
          },
        });

        console.log(response, preference, value);
      } else if (input.type === ResourceRecordType.Srv) {
        const { priority, weight, port, ...inputData } = JSON.parse(data);

        const response = await createSRV({
          variables: {
            zoneId: zoneData.id,
            input: {
              ...inputData,
              host: input.host,
              ttl: ttl ? parseInt((ttl as unknown) as string) : undefined,
              priority: parseInt(priority),
              weight: parseInt(weight),
              port: parseInt(port),
            },
          },
        });

        if (response.data?.createSRVResourceRecord)
          enqueueSnackbar('Successfully added SRV Record', {
            variant: 'success',
          });
      } else {
        console.log(ttl);
        const response = await createValueRR({
          variables: {
            zoneId: zoneData.id,
            input: {
              ...input,
              type: input.type,
              ttl: ttl ? parseInt((ttl as unknown) as string) : undefined,
              value: JSON.parse(data).value,
            },
          },
        });
        console.log(response);
      }
    },
    [zoneData, createValueRR, createMXRR, createSRV, enqueueSnackbar],
  );

  const handleResourceRecordChanges = useCallback(
    async ({ id, type, data, ...inputData }: RRData) => {
      const input = Object.fromEntries(
        Object.entries(inputData).filter(
          ([key, value]) => key !== '__typename',
        ),
      );

      if (type === ResourceRecordType.Mx) {
        const { preference, value } = JSON.parse(data);

        const response = await updateMXResourceRecord({
          variables: {
            resourceRecordId: id,
            input: {
              value,
              preference: parseInt(preference),
              ...input,
            },
          },
        });

        if (response.data)
          enqueueSnackbar('Successfully updated resource record', {
            variant: 'success',
          });
      } else if (type === ResourceRecordType.Srv) {
        const { priority, weight, port, ...inputData } = JSON.parse(data);

        const response = await updateSRVResourceRecord({
          variables: {
            resourceRecordId: id,
            input: {
              ...input,
              host: input.host,
              priority: parseInt(priority),
              weight: parseInt(weight),
              port: parseInt(port),
            },
          },
        });

        console.log('Change SRV', response);
      } else {
        const { value } = JSON.parse(data);

        const response = await updateValueResourceRecord({
          variables: {
            resourceRecordId: id,
            input: {
              value,
              ...input,
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
        title={zoneData?.domainName || 'Zone RRs'}
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
                onChange={({ target }) => onChange(parseInt(target.value) || 0)}
                {...props}
              />
            ),
          },
        ]}
        data={zoneData?.resourceRecords || []}
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
