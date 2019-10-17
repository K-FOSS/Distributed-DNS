// UI/Components/Styles/Section/PageSection/index.tsx
import React, { PropsWithChildren } from 'react';
import Paper from '@material-ui/core/Paper';
import { useStyles } from 'UI/Components/Styles';

export function PaperSection({
  children,
}: PropsWithChildren<{}>): React.ReactElement {
  const classes = useStyles();

  return <Paper className={classes.section}>{children}</Paper>;
}
