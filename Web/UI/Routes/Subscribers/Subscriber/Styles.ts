// Web/UI/Routes/Subscribers/Subscriber/Styles.ts
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useSubscriberPageStyles = makeStyles((theme: Theme) =>
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
