// Web/UI/Routes/Zones/ZoneSettings/index.tsx
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { useImport } from 'UI/Components/Providers/ImportProvider';
import { useStyles } from 'UI/Components/Styles';
import { BaseButton } from 'UI/Components/Styles/Button/BaseButton';
import { Header } from 'UI/Components/Styles/Header';
import { BaseList } from 'UI/Components/Styles/List/BaseList';
import { LabelListItem } from 'UI/Components/Styles/List/ListItems/LabelListItem';
import { Loader } from 'UI/Components/Styles/Loader';
import { PageSectionRoot } from 'UI/Components/Styles/Section/PageSectionRoot';
import { PaperSection } from 'UI/Components/Styles/Section/PaperSection';
import { useUsersQuery } from 'UI/Components/Users/AutoSuggest/Users.gen';
import { Permission, User } from 'UI/GraphQL/graphqlTypes.gen';
import { useZoneSettingsQuery } from './ZoneSettings.gen';
import { useAddZoneUserMutation } from './AddZoneUser.gen';
import { useSnackbar } from 'notistack';

interface ZoneSettingsPageParams {
  zoneId: string;
}

export type UserData = Pick<User, 'username' | 'id'>;

export default function ZoneSettingsPage(): React.ReactElement {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar()
  const { data: userData } = useUsersQuery();
  const [newUser, setNewUser] = useState<UserData>();
  const [addZoneUser] = useAddZoneUserMutation()
  const [newUserPermission, setNewUserPermission] = useState<Permission>(
    Permission.Read,
  );
  const { zoneId } = useParams<ZoneSettingsPageParams>();
  const { data } = useZoneSettingsQuery({ variables: { zoneId } });
  const TextField = useImport({
    imported: import(
      'UI/Components/Styles/Inputs/TextField/BaseTextField/index'
    ),
    path: 'Components/Styles/Inputs/TextField/BaseTextField/index.tsx',
    // TODO: TextField Skeleton Loader
    Loader,
  });

  const getPermission = useCallback(
    (permissions: Permission[]) => {
      if (permissions.includes(Permission.Admin)) return Permission.Admin;
      else if (permissions.includes(Permission.Write)) return Permission.Write;
      else if (permissions.includes(Permission.Read)) return Permission.Read;
    },
    [zoneId],
  );

  const handleAddUser = useCallback(async () => {
    if (!newUser?.id) {
      enqueueSnackbar('User not selected', { variant: 'error' })
      return
    }
    const response = await addZoneUser({
      variables: {
        zoneId,
        input: {
          userId: newUser?.id,
          accessPermission: newUserPermission
        }
      }
    })
    console.log('Add new User', response)
  }, [newUserPermission, newUser])

  return (
    <>
      <Header title={{ primary: 'Zone Settings' }} />
      <div className={classes.pageRoot}>
        <PageSectionRoot>
          <PaperSection>
            <Typography variant='h4'>User Management</Typography>
            <BaseList>
              {(data?.zone.accessPermissions || []).map(
                ({ user: { username }, accessPermissions, id }) => (
                  <LabelListItem
                    key={id}
                    label={{
                      primary: username,
                      secondary: getPermission(accessPermissions),
                    }}
                  />
                ),
              )}
            </BaseList>
            <div style={{ display: 'flex', minWidth: '30em' }}>
              <Autocomplete
                options={userData?.users.filter(
                  (a) =>
                    !data?.zone.accessPermissions.some(
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
                onChange={({ target }) =>
                  setNewUserPermission(target.value as any)
                }
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
        </PageSectionRoot>
      </div>
    </>
  );
}
