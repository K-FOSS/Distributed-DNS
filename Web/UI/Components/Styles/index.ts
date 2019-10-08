// UI/UI/Components/Layout/Styles.tsx
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = '240px';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      width: '100%',
    },
    toolbar: theme.mixins.toolbar,
    header: {
      background: theme.palette.secondary.main,
      color: 'white',
      width: '100%',
      minHeight: '195px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTextDiv: {
      alignSelf: 'center',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    headerText: {
      marginLeft: '1rem',
      marginRight: '1rem',
    },
  }),
);
