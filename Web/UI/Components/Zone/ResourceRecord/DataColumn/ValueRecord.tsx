// Web/UI/Components/Zone/ResourceRecord/ValueRecord/index.tsx
import React from 'react';

interface ValueResourceRecordProps {
  JSONData: string;
}

export function ValueResourceRecord({
  JSONData,
}: ValueResourceRecordProps): React.ReactElement {
  const { value } = JSON.parse(JSONData);
  return <>{value}</>;
}
