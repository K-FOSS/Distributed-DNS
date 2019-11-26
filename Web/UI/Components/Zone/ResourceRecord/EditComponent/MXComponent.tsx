// Web/UI/Components/Zone/ResourceRecord/EditComoponent/MXComponent.tsx
import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { useTextField } from 'UI/Components/Styles/Form/useTextField';
import { useStyles } from './Styles';

interface MXComponentProps {
  value: string;
  onChange: (value: string) => void;
}

interface MXRR {
  preference: string;
  value: string;
}

export function MXEditComponent({
  value,
  onChange,
}: MXComponentProps): React.ReactElement {
  const TextField = useTextField();
  const classes = useStyles();

  const valueObj = useMemo(
    (): MXRR => (value ? JSON.parse(value) : { preference: '10', value: '' }),
    [value],
  );

  const handleChange = useCallback(
    (prop: keyof MXRR) => ({ target }: ChangeEvent<HTMLInputElement>) =>
      onChange(JSON.stringify({ ...valueObj, [prop]: target.value })),
    [valueObj, onChange],
  );

  return (
    <div className={classes.doubleTextField}>
      <TextField
        label='Priority'
        variant='outlined'
        className={classes.doubleTextLeft}
        value={valueObj.preference}
        onChange={handleChange('preference')}
      />
      <TextField
        label='Value'
        variant='outlined'
        value={valueObj.value}
        onChange={handleChange('value')}
      />
    </div>
  );
}
