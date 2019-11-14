// Web/UI/Components/Zone/ResourceRecord/EditComponent/Styles.ts
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    doubleTextField: {
      display: 'flex',
    },
    doubleTextLeft: {
      marginRight: '1em',
    },
    srvTargetField: {
      width: '-webkit-fill-available'
    },
    srvProtoSelect: {
      width: '170px'
    }
  }),
);
