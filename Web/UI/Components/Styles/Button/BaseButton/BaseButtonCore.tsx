// Web/UI/Components/Styles/Button/BaseButton/BaseButtonCore.tsx
import React, { PropsWithChildren, useMemo } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { useStyles } from './Styles';

export interface BaseButtonProps extends ButtonProps {
  label: string;
  submit?: boolean;
  mainColor?: 'red' | 'green';
}

export default function BaseButtonCore({
  submit,
  label,
  children,
  ...props
}: PropsWithChildren<BaseButtonProps>): React.ReactElement {
  const classes = useStyles({});

  return useMemo(
    () => (
      <Button
        {...props}
        type={submit ? 'submit' : props.type}
        className={classes.button}
      >
        {children}
        {label}
      </Button>
    ),
    [props, submit, classes.button, children, label],
  );
}
