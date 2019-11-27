// Web/UI/Components/Zone/ResourceRecord/EditComponent/ValueComponent.tsx
import React, { useMemo } from 'react';
import { useTextField } from 'UI/Components/Styles/Form/useTextField';

interface ValueComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export function ValueEditComponent({
  value,
  onChange,
}: ValueComponentProps): React.ReactElement {
  const TextField = useTextField();

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
