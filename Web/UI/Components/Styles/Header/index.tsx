// Web/UI/Components/Styles/Header/index.tsx
import React, {
  PropsWithChildren,
  DetailedHTMLProps,
  HTMLAttributes,
  useMemo,
} from 'react';
import { useStyles } from '../index';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

export interface HeaderTitle {
  primary: string;
  secondary?: string;
}

export interface HeaderProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    'title' | 'className'
  > {
  title: HeaderTitle;
}

export function Header({
  title,
  ...props
}: PropsWithChildren<HeaderProps>): React.ReactElement {
  const classes = useStyles();

  return useMemo(
    () => (
      <header className={classes.header} {...props}>
        {title && (
          <div className={classes.headerTextDiv}>
            {title.primary ? (
              <Typography
                variant='h4'
                align='center'
                className={classes.headerText}
              >
                {title.primary}
              </Typography>
            ) : (
              <Skeleton
                disableAnimate
                variant='text'
                width='50%'
                style={{ alignSelf: 'center' }}
                height={20}
              />
            )}

            {title.secondary && (
              <Typography
                variant='body1'
                align='center'
                className={classes.headerText}
              >
                {title.secondary}
              </Typography>
            )}
          </div>
        )}
        {props.children}
      </header>
    ),
    [classes.header, classes.headerText, classes.headerTextDiv, props, title],
  );
}
