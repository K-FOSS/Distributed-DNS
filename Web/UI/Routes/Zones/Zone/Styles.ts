// Web/UI/Routes/Zones/Zone/Styles.ts
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerSettingsCog: {
      alignSelf: 'flex-start', 
      color: 'white'
    },
    headerSettingsLink: {
      position: 'absolute', 
      right: 0
    }
  }),
);
