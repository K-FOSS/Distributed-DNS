// Web/UI/Components/Zone/ResourceRecord/DataColumn/MXRecord.tsx
import React from 'react';

interface MXResourceRecordProps {
  JSONData: string;
}

export function MXResourceRecord({
  JSONData,
}: MXResourceRecordProps): React.ReactElement {
  const { value, preference } = JSON.parse(JSONData);
  return (
    <>
      {preference} {value}
    </>
  );
}
