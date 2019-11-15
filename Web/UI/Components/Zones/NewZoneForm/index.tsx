// Web/UI/Components/Zones/NewZoneDialog/index.tsx
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useState } from 'react';
import { Form } from 'UI/Components/Styles/Form';
import {
  FieldType,
  TextFieldInputType,
} from 'UI/Components/Styles/Form/useFields';
import { UsersAutoSuggest } from 'UI/Components/Users/AutoSuggest';
import { User } from 'UI/GraphQL/graphqlTypes.gen';
import { useCreateZoneMutation } from '../GraphQL/CreateZone.gen';
import { useSnackbar } from 'notistack';

export type UserData = Pick<User, 'username' | 'id'>;

interface FormData {
  domainName: string;
  contact: string;
  ns: string;
}

export function NewZoneForm(): React.ReactElement {
  const [zoneUsers, setZoneUsers] = useState<UserData[]>([]);
  const [createZone] = useCreateZoneMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      const response = await createZone({
        variables: {
          input: { ...formData, zoneUserIds: zoneUsers.map(({ id }) => id) },
        },
      });

      if (response && response.data)
        enqueueSnackbar('Zone created successfully', { variant: 'success' });

      console.log(response);
      console.log(formData, zoneUsers);
    },
    [zoneUsers, enqueueSnackbar, createZone],
  );

  return (
    <Form<FormData>
      title={
        <Typography variant='h4' align='center'>
          New Zone
        </Typography>
      }
      onSubmit={handleSubmit}
      fields={[
        {
          type: FieldType.TEXT,
          inputType: TextFieldInputType.USERNAME,
          name: 'domainName',
          label: 'Domain Name',
        },
        {
          type: FieldType.TEXT,
          inputType: TextFieldInputType.TEXT,
          name: 'contact',
          label: 'Contact',
        },
        {
          type: FieldType.TEXT,
          inputType: TextFieldInputType.TEXT,
          name: 'ns',
          label: 'Name server',
        },
      ]}
    >
      <UsersAutoSuggest
        selectedUsers={zoneUsers}
        setSelectedUsers={setZoneUsers}
      />
    </Form>
  );
}
