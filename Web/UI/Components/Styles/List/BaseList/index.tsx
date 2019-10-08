// Web/UI/Components/Styles/List/BaseList/index.tsx
import React, { PropsWithChildren, useCallback } from 'react';
import List, { ListProps } from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

interface ListSubHeader {
  title: string;
}

interface BaseListProps extends Omit<ListProps, 'subheader'> {
  subheader?: ListSubHeader;
}

export function BaseList({
  children,
  subheader,
  ...props
}: PropsWithChildren<BaseListProps>): React.ReactElement {
  const ListHeader = useCallback(
    () =>
      subheader ? <ListSubheader>{subheader.title}</ListSubheader> : <></>,
    [subheader],
  );

  return (
    <List subheader={<ListHeader />} {...props}>
      {children}
    </List>
  );
}
