// Web/UI/Components/Zones/AutoSuggest/Styles.ts
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    suggestPaper: {
      zIndex: theme.zIndex.modal + 5,
      maxHeight: '15rem',
      overflowY: 'auto',
      marginTop: theme.spacing(1),
      position: 'absolute',
    },
    chip: {
      margin: theme.spacing(0.5, 0.25),
    },
    inputRoot: {
      flexWrap: 'wrap',
    },
  }),
);
