// Web/UI/Components/Zone/ResourceRecord/RRTypeProvider/index.tsx
import React from 'react';
import {
  DataTypeProvider,
  DataTypeProviderProps,
} from '@devexpress/dx-react-grid';
import {
  ResourceRecord,
  ResourceRecordType,
} from 'UI/GraphQL/graphqlTypes.gen';
import Typography from '@material-ui/core/Typography';

interface RRFormatterProps extends DataTypeProvider.ValueFormatterProps {
  value: string;
  row?: Pick<ResourceRecord, 'id' | 'host' | 'data' | 'type'>;
}

function RRFormatter({ value, row }: RRFormatterProps): React.ReactElement {
  if (!row) return <></>;
  if (
    row.type === ResourceRecordType.A ||
    row.type === ResourceRecordType.Aaaa ||
    row.type === ResourceRecordType.Cname ||
    row.type === ResourceRecordType.Dname ||
    row.type === ResourceRecordType.Ns
  )
    return (
      <Typography variant='body1'>
        {...Object.values(JSON.parse(value))}
      </Typography>
    );
  return <></>;
}
export function RRTypeProvider(
  props: DataTypeProviderProps,
): React.ReactElement {
  return <DataTypeProvider formatterComponent={RRFormatter} {...props} />;
}
