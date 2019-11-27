// Web/UI/Components/Zone/ResourceRecord/Select/index.tsx
import React from 'react';
import { useTextField } from 'UI/Components/Styles/Form/useTextField';
import { ResourceRecordType } from 'UI/GraphQL/graphqlTypes.gen';

interface ResourceRecordSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function ResourceRecordSelect({
  value,
  onChange,
}: ResourceRecordSelectProps): React.ReactElement {
  const TextField = useTextField();

  return (
    <TextField
      select
      variant='outlined'
      value={value}
      onChange={({ target }) => onChange(target.value)}
      SelectProps={{
        native: true,
      }}
      fullWidth
    >
      {Object.entries(ResourceRecordType).map(([, value], i) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </TextField>
  );
}
