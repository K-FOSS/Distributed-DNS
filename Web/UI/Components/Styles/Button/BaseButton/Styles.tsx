// Web/UI/Components/Styles/Button/BaseButton/Styles.tsx
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { BaseButtonProps } from './BaseButtonCore';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: '1em !important',
      color: ({
        mainColor,
      }: Omit<
        BaseButtonProps,
        'submit' | 'label' | 'children' | 'className'
      >) => mainColor,
    },
  }),
);
