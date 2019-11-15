// Web/UI/Routes/Zones/ZoneSettings/UserManagement.tsx
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSnackbar } from 'notistack';
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { useImport } from 'UI/Components/Providers/ImportProvider';
import { BaseButton } from 'UI/Components/Styles/Button/BaseButton';
import { BaseList } from 'UI/Components/Styles/List/BaseList';
import { LabelListItem } from 'UI/Components/Styles/List/ListItems/LabelListItem';
import { Loader } from 'UI/Components/Styles/Loader';
import { PaperSection } from 'UI/Components/Styles/Section/PaperSection';
import { useUsersQuery } from 'UI/Components/Users/AutoSuggest/Users.gen';
import { Permission, User } from 'UI/GraphQL/graphqlTypes.gen';
import { useAddZoneUserMutation } from './AddZoneUser.gen';
import { useRemoveZoneUserMutation } from './RemoveZoneUser.gen';
import { ZoneSettingsQuery } from './ZoneSettings.gen';

export interface UserManagementPanelProps {
  zoneData: ZoneSettingsQuery | undefined;
}

interface ZoneSettingsPageParams {
  zoneId: string;
}

export type UserData = Pick<User, 'username' | 'id'>;

export function UserManagementPanel({
  zoneData,
}: UserManagementPanelProps): React.ReactElement {
  const { zoneId } = useParams<ZoneSettingsPageParams>();

  const TextField = useImport({
    imported: import(
      'UI/Components/Styles/Inputs/TextField/BaseTextField/index'
    ),
    path: 'Components/Styles/Inputs/TextField/BaseTextField/index.tsx',
    // TODO: TextField Skeleton Loader
    Loader,
  });

  const { data: userData } = useUsersQuery();
  const { enqueueSnackbar } = useSnackbar();

  const [addZoneUser] = useAddZoneUserMutation();
  const [removeZoneUser] = useRemoveZoneUserMutation();

  const [newUserPermission, setNewUserPermission] = useState<Permission>(
    Permission.Read,
  );

  const [newUser, setNewUser] = useState<UserData>();

  const handleAddUser = useCallback(async () => {
    if (!newUser?.id) {
      enqueueSnackbar('User not selected', { variant: 'error' });
      return;
    }
    const response = await addZoneUser({
      variables: {
        zoneId,
        input: {
          userId: newUser?.id,
          accessPermission: newUserPermission,
        },
      },
    });
    console.log('Add new User', response);
  }, [newUserPermission, newUser, addZoneUser, enqueueSnackbar, zoneId]);

  const handleDeleteUser = useCallback(
    (zoneUserId: string) => () =>
      removeZoneUser({ variables: { zoneId, zoneUserId } }),
    [removeZoneUser, zoneId],
  );

  const getPermission = useCallback((permissions: Permission[]) => {
    if (permissions.includes(Permission.Admin)) return Permission.Admin;
    else if (permissions.includes(Permission.Write)) return Permission.Write;
    else if (permissions.includes(Permission.Read)) return Permission.Read;
  }, []);

  return (
    <>
      <PaperSection>
        <Typography variant='h4'>User Management</Typography>
        <BaseList>
          {(zoneData?.zone.accessPermissions || []).map(
            ({ user: { username, id: userId }, accessPermissions, id }) => (
              <LabelListItem
                key={id}
                label={{
                  primary: username,
                  secondary: getPermission(accessPermissions),
                }}
              >
                <IconButton onClick={handleDeleteUser(userId)}>
                  <DeleteIcon />
                </IconButton>
              </LabelListItem>
            ),
          )}
        </BaseList>
        <div style={{ display: 'flex', minWidth: '30em' }}>
          <Autocomplete
            options={userData?.users.filter(
              (a) =>
                !zoneData?.zone.accessPermissions.some(
                  ({ user }) => user.username === a.username,
                ),
            )}
            getOptionLabel={(option) => option.username}
            style={{ marginRight: '1em', width: '100%' }}
            value={newUser}
            onChange={(test, user: UserData) => setNewUser(user)}
            renderInput={(params) => (
              <TextField
                {...params}
                label='New User'
                variant='outlined'
                fullWidth
              />
            )}
          />
          <TextField
            select
            variant='outlined'
            value={newUserPermission}
            onChange={({ target }) => setNewUserPermission(target.value as any)}
            SelectProps={{
              native: true,
            }}
            fullWidth
          >
            {Object.entries(Permission).map(([, value], i) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </TextField>
          <BaseButton
            label='Add User'
            onClick={handleAddUser}
            style={{
              minWidth: '7.5rem',
              height: '100%',
              marginLeft: '1em',
            }}
            color='primary'
            variant='contained'
          />
        </div>
      </PaperSection>
    </>
  );
}
