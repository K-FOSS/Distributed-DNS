// Web/UI/Routes/Admin/Test.tsx
import React, { useCallback, useState, ChangeEvent } from 'react';
import { BaseButton } from 'UI/Components/Styles/Button/BaseButton';
import { useSnackbar, VariantType } from 'notistack';
import { BaseList } from 'UI/Components/Styles/List/BaseList';
import { useUsersQuery } from './Users.gen';
import { LabelListItem } from 'UI/Components/Styles/List/ListItems/LabelListItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Header } from 'UI/Components/Styles/Header';

interface User {
  id: string;
  username: string;
}

export default function AdminTestRoute(): React.ReactElement {
  const { data } = useUsersQuery();
  const [userId, setUserId] = useState<string>();
  const [variant, setVariant] = useState<VariantType>('default');
  const { enqueueSnackbar } = useSnackbar();

  const deleteUser = useCallback(() => {
    console.log(`Deleting User ${userId}`);
    enqueueSnackbar('User deleted Successfully', { variant });
    setUserId(undefined);
  }, [enqueueSnackbar, userId, setUserId, variant]);

  const handleClickUser = useCallback(
    (userId: string) => () => setUserId(userId),
    [setUserId],
  );

  const isSelected = useCallback((Id: string) => Id === userId, [userId]);

  const handleRadio = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) =>
      setVariant(target.value as VariantType),
    [setVariant],
  );

  return (
    <>
      <Header title={{ primary: 'Admin Test' }} background='secondary' />

      <div style={{ margin: '1em' }}>
        <BaseList>
          {data && data.users ? (
            data.users.map(({ username, id }) => (
              <LabelListItem
                selected={isSelected(id)}
                key={id}
                label={{ primary: username }}
                onClick={handleClickUser(id)}
              />
            ))
          ) : (
            <div>Loading</div>
          )}
        </BaseList>

        <BaseButton
          color='primary'
          variant='contained'
          label='Delete User'
          onClick={deleteUser}
        />

        <div>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Snackbar Variant</FormLabel>
            <RadioGroup name='gender1' value={variant} onChange={handleRadio}>
              {['default', 'error', 'success', 'warning', 'info'].map(
                (type) => (
                  <FormControlLabel
                    key={type}
                    value={type}
                    control={<Radio />}
                    label={type}
                  />
                ),
              )}
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </>
  );
}
