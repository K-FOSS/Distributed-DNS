// Web/UI/Components/Styles/List/ListItems/BaseListItem/index.tsx
import React, { PropsWithChildren } from 'react';
import ListItem, { ListItemTypeMap } from '@material-ui/core/ListItem';
import { OverrideProps } from '@material-ui/core/OverridableComponent';

export type BaseListItemProps = OverrideProps<
  ListItemTypeMap<{ button?: true; component?: React.ReactNode }, 'div'>,
  'div'
>;

export function BaseListItem({
  children,
  ...props
}: PropsWithChildren<BaseListItemProps>): React.ReactElement {
  return (
    <ListItem button {...props}>
      {children}
    </ListItem>
  );
}
