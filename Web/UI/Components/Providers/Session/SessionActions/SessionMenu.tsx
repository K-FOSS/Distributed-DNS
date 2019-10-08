// Web/UI/Components/Providers/Session/SessionActions/SessionMenu.tsx
import React, { useMemo, useCallback } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useToken } from '../useToken';

interface SessionMenuProps {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLAnchorElement | null;
}

type MenuAction = 'logout';

interface MenuItemType {
  label: string;
  name: MenuAction;
}

const MenuItems: MenuItemType[] = [{ label: 'Logout', name: 'logout' }];

export function SessionMenu({
  onClose,
  ...props
}: SessionMenuProps): React.ReactElement {
  const { deleteToken } = useToken();

  const handleMenuItem = useCallback(
    (item: MenuAction) => () => {
      if (item === 'logout') deleteToken();
      onClose();
    },
    [onClose, deleteToken],
  );

  return useMemo(
    () => (
      <Menu
        id='menu-appbar'
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            top: '4.05em',
          },
        }}
        onClose={onClose}
        {...props}
      >
        {MenuItems.map(({ label, name }) => (
          <MenuItem key={name} onClick={handleMenuItem(name)}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    ),
    [props, handleMenuItem, onClose],
  );
}
