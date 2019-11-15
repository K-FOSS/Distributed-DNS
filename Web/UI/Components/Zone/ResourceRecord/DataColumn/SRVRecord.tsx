// Web/UI/Components/Zone/ResourceRecord/DataColumn/SRVRecord.tsx
import React from 'react';
import { SrvProtocol } from 'UI/GraphQL/graphqlTypes.gen';

interface SRVResourceRecordDataColumnProps {
  JSONData: string;
}

export function SRVResourceRecordDataColumn({
  JSONData,
}: SRVResourceRecordDataColumnProps): React.ReactElement {
  const data = JSON.parse(JSONData);

  return (
    <>
      {data.service} {SrvProtocol[data.protocol as keyof typeof SrvProtocol]}{' '}
      {data.priority} {data.weight} {data.port} {data.target}
    </>
  );
}
