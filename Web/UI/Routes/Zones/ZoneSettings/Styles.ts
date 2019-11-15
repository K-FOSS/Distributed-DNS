// Web/UI/Routes/Zones/ZoneSettings/Styles.ts
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useZoneSettingsPageStyles = makeStyles((theme: Theme) =>
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
