// Web/UI/Components/Styles/List/ListItems/ParentListItem/index.tsx
import React, {
  useState,
  useCallback,
  PropsWithChildren,
  useMemo,
} from 'react';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { LabelListItem, LabelListItemText } from '../LabelListItem';
import { BaseList } from 'UI/Components/Styles/List/BaseList';
import { useStyles } from './Styles';

export interface ParentListItemProps {
  label: LabelListItemText;
  initialState?: boolean;
}

export function ParentListItem({
  label,
  initialState = false,
  children,
}: PropsWithChildren<ParentListItemProps>): React.ReactElement {
  const [open, setOpen] = useState<boolean>(initialState);
  const classes = useStyles({});

  const toggleOpen = useCallback(() => setOpen((state) => !state), [setOpen]);

  return useMemo(
    () => (
      <>
        <LabelListItem label={label} onClick={toggleOpen}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </LabelListItem>

        <Collapse
          className={classes.root}
          in={open}
          timeout='auto'
          unmountOnExit
        >
          <BaseList>{children}</BaseList>
        </Collapse>
      </>
    ),
    [children, classes.root, open, label, toggleOpen],
  );
}
