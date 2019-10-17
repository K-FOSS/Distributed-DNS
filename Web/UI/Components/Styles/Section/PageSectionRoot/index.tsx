// UI/Components/Styles/Section/PageSection/index.tsx
import React, { PropsWithChildren } from 'react';
import { useStyles } from 'UI/Components/Styles';

export function PageSectionRoot({
  children,
}: PropsWithChildren<{}>): React.ReactElement {
  const classes = useStyles({});

  return (
    <div className={classes.pageSectionRoot}>
      <div className={classes.pageSection}>{children}</div>
    </div>
  );
}
