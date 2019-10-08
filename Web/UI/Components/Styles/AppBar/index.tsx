// Web/UI/Components/Styles/AppBar/index.tsx
import TopAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useMemo } from 'react';
import { useNavState } from 'UI/Components/Providers/NavProvider';
import { useStyles } from 'UI/Components/Styles';
import { SessionActions } from 'UI/Components/Providers/Session/SessionActions';

export default function AppBar(): React.ReactElement {
  const { toggleNav } = useNavState();
  const classes = useStyles({});

  return useMemo(
    () => (
      <>
        <TopAppBar position='fixed' className={classes.appBar}>
          <Toolbar>
            <IconButton className={classes.menuButton} onClick={toggleNav}>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              AppName
            </Typography>
            <SessionActions />
          </Toolbar>
        </TopAppBar>
        <div className={classes.toolbar} />
      </>
    ),
    [
      classes.appBar,
      classes.menuButton,
      classes.toolbar,
      classes.title,
      toggleNav,
    ],
  );
}
