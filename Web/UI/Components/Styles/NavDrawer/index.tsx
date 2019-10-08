// Web/UI/Components/Styles/NavDrawer/index.tsx
import React, { useMemo } from 'react';
import { useNavState } from 'UI/Components/Providers/NavProvider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { useStyles } from 'UI/Components/Styles';
import { generateList } from 'UI/Components/Router/generateList';
import { Routes } from 'UI/Components/Router/Routes';
import { useSession } from 'UI/Components/Providers/Session/SessionProvider';

export default function NavDrawer(): React.ReactElement {
  const { navOpen, toggleNav } = useNavState();
  const classes = useStyles({});
  const { roles } = useSession();

  const routes = useMemo(() => generateList(Routes, roles), [roles]);

  return useMemo(
    () => (
      <SwipeableDrawer
        open={navOpen || false}
        onOpen={toggleNav}
        className={classes.drawer}
        onClose={toggleNav}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        {...routes}
      </SwipeableDrawer>
    ),
    [
      navOpen,
      classes.drawer,
      classes.drawerPaper,
      classes.toolbar,
      routes,
      toggleNav,
    ],
  );
}
