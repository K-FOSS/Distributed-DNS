// UI/UI/Components/Style/Form/Styles.tsx
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fieldStyle: {
      marginTop: '1em',
    },
    form: {
      maxWidth: '275px',
      padding: '1em',
    },
  }),
);
