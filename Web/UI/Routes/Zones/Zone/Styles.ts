// Web/UI/Routes/Zones/Zone/Styles.ts
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useZonePageStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerSettingsCog: {
      alignSelf: 'flex-start',
      color: 'white',
    },
    headerSettingsLink: {
      position: 'absolute',
      right: 0,
    },
  }),
);
