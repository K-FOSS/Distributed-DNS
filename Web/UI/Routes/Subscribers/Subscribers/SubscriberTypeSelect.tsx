// Web/UI/Routes/Subscribers/Subscribers/SubscriberTypeSelect.tsx
import React from 'react';
import { useImport } from 'UI/Components/Providers/ImportProvider';
import { Loader } from 'UI/Components/Styles/Loader';
import {
  ResourceRecordType,
  SubscriberType,
} from 'UI/GraphQL/graphqlTypes.gen';

interface SubscriberTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function SubscriberTypeSelect({
  value,
  onChange,
}: SubscriberTypeSelectProps): React.ReactElement {
  const TextField = useImport({
    imported: import(
      'UI/Components/Styles/Inputs/TextField/BaseTextField/index'
    ),
    path: 'Components/Styles/Inputs/TextField/BaseTextField/index.tsx',
    // TODO: TextField Skeleton Loader
    Loader,
  });

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
      {Object.entries(SubscriberType).map(([, value], i) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </TextField>
  );
}
