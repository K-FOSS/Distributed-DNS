// Web/UI/Components/Zone/ResourceRecord/EditComponent/ValueComponent.tsx
import React, { useMemo } from 'react';
import { useImport } from 'UI/Components/Providers/ImportProvider';
import { Loader } from 'UI/Components/Styles/Loader';

interface ValueComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export function ValueEditComponent({
  value,
  onChange,
}: ValueComponentProps): React.ReactElement {
  const TextField = useImport({
    imported: import(
      'UI/Components/Styles/Inputs/TextField/BaseTextField/index',
    ),
    path: 'Components/Styles/Inputs/TextField/BaseTextField/index.tsx',
    // TODO: TextField Skeleton Loader
    Loader,
  });

  const valueObj = useMemo(
    (): any => (value ? JSON.parse(value) : { value: '' }),
    [value],
  );

  return (
    <TextField
      label='Value'
      variant='outlined'
      value={valueObj.value}
      onChange={({ target }) =>
        onChange(JSON.stringify({ value: target.value }))
      }
    />
  );
}
