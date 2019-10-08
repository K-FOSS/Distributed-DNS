// Web/UI/Components/Providers/Session/SessionActions/index.tsx
import React, { useMemo, useRef, useCallback, useState } from 'react';
import { useIsAuthorized } from 'UI/Components/Providers/Session/useIsAuthorized';
import { UserRole } from 'UI/GraphQL/graphqlTypes.gen';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { SessionMenu } from './SessionMenu';
import { useStyles } from './Styles';

export function SessionActions(): React.ReactElement {
  const classes = useStyles({});

  const isAuthorized = useIsAuthorized([UserRole.User]);

  const menuAnchor = useRef<HTMLAnchorElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return useMemo(
    () =>
      !isAuthorized ? (
        <></>
      ) : (
        <>
          <IconButton onClick={openMenu} buttonRef={menuAnchor}>
            <AccountCircle className={classes.sessionIcon} />
          </IconButton>
          <SessionMenu
            open={menuOpen}
            onClose={closeMenu}
            anchorEl={menuAnchor.current}
          />
        </>
      ),
    [isAuthorized, menuOpen, closeMenu, classes.sessionIcon, openMenu],
  );
}
