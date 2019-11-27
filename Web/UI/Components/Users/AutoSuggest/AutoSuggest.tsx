// Web/UI/Components/Users/AutoSuggest/AutoSuggest.tsx
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTextField } from 'UI/Components/Styles/Form/useTextField';
import { User } from 'UI/GraphQL/graphqlTypes.gen';
import { useStyles } from './Styles';
import { useUsersQuery } from './Users.gen';

export type UserData = Pick<User, 'username' | 'id'>;

interface AutoSuggestProps {
  selectedUsers: UserData[];
  setSelectedUsers: Dispatch<SetStateAction<UserData[]>>;
}

interface State {
  usernameFilter: string;
  hideSuggest: boolean;
}

type HandleStateChange = <T extends keyof State>(
  key: T,
  value: State[T],
) => void;

export function UsersAutoSuggest({
  selectedUsers,
  setSelectedUsers,
}: AutoSuggestProps): React.ReactElement {
  const classes = useStyles({});
  const { data } = useUsersQuery();
  const inputRef = useRef<HTMLInputElement>();

  const [state, setState] = useState<State>({
    usernameFilter: '',
    hideSuggest: true,
  });

  const TextField = useTextField();

  const handleStateChange: HandleStateChange = useCallback(
    (field, value) =>
      setState((currentState) => ({ ...currentState, [field]: value })),
    [setState],
  );

  const handleToggleHideSuggest = useCallback(
    (value: boolean) => handleStateChange('hideSuggest', value),
    [handleStateChange],
  );

  const handleUsernameFilterChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) =>
      handleStateChange('usernameFilter', target.value),
    [handleStateChange],
  );

  const handleAddUser = useCallback(
    (user: UserData) => {
      setSelectedUsers((selectedUsersState) => [...selectedUsersState, user]);
      setState({ hideSuggest: true, usernameFilter: '' });
    },
    [setSelectedUsers, setState],
  );

  const handleDeleteUser = useCallback(
    (user: UserData) =>
      setSelectedUsers((selectedUsersState) =>
        selectedUsersState
          ? selectedUsersState.filter((selectedUser) => selectedUser !== user)
          : [],
      ),
    [setSelectedUsers],
  );

  const filteredUsers = useMemo(
    () =>
      data && data.users ? (
        data.users
          .filter(
            (user) =>
              user.username.includes(state.usernameFilter) &&
              !selectedUsers.find(({ id }) => user.id === id),
          )
          .map((user) => (
            <MenuItem key={user.id} onClick={() => handleAddUser(user)}>
              {user.username}
            </MenuItem>
          ))
      ) : (
        <></>
      ),
    [data, state, selectedUsers, handleAddUser],
  );

  const suggestMemo = useMemo(
    () =>
      state.hideSuggest ? (
        <></>
      ) : (
        <Paper
          className={classes.suggestPaper}
          style={{
            width: inputRef.current ? `${inputRef.current.clientWidth}px` : '',
          }}
        >
          {filteredUsers}
        </Paper>
      ),
    [classes.suggestPaper, state.hideSuggest, filteredUsers, inputRef],
  );

  return (
    <div>
      <TextField
        onFocus={() => handleToggleHideSuggest(false)}
        label='User'
        variant='outlined'
        value={state.usernameFilter}
        onChange={handleUsernameFilterChange}
        innerRef={inputRef}
        fullWidth
        multiline
        style={{ marginTop: '1em' }}
        onBlur={() => setTimeout(() => handleToggleHideSuggest(true), 200)}
        InputProps={{
          startAdornment: selectedUsers.map((item) => (
            <Chip
              key={item.id}
              tabIndex={-1}
              label={item.username}
              className={classes.chip}
              onDelete={() => handleDeleteUser(item)}
            />
          )),
          className: classes.inputRoot,
        }}
      />
      {suggestMemo}
    </div>
  );
}
