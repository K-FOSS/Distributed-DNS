// Web/UI/Components/Zone/ResourceRecord/EditComoponent/MXComponent.tsx
import React, { useCallback, ChangeEvent, useMemo } from 'react';
import { useImport } from 'UI/Components/Providers/ImportProvider';
import { Loader } from 'UI/Components/Styles/Loader';
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
  const TextField = useImport({
    imported: import(
      'UI/Components/Styles/Inputs/TextField/BaseTextField/index',
    ),
    path: 'Components/Styles/Inputs/TextField/BaseTextField/index.tsx',
    // TODO: TextField Skeleton Loader
    Loader,
  });
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
