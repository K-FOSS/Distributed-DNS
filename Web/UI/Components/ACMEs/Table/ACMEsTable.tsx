// Web/UI/Components/ACMEs/Table/ACMEsTable.tsx
import React, { useCallback } from 'react';
import MaterialTable from 'material-table';
import { useAcmEsQuery } from '../GraphQL/ACMEs.gen';
import { Acme } from 'UI/GraphQL/graphqlTypes.gen';
import { useHistory } from 'react-router-dom';

type ACMEData = Pick<Acme, 'id' | 'name'>;

type RowClick<T> = (
  event?: React.MouseEvent,
  rowData?: T,
  toggleDetailPanel?: (panelIndex?: number) => void,
) => void;

export function ACMEsTable(): React.ReactElement {
  const history = useHistory();
  const { data } = useAcmEsQuery();

  const handleAddACME = useCallback(async (input: Pick<ACMEData, 'name'>) => {
    console.log(input);
  }, []);

  const handleRowClick: RowClick<ACMEData> = useCallback(
    (a, rowData) => rowData && history.push(`/ACMEs/${rowData.id}`),
    [history],
  );

  return (
    <>
      <MaterialTable
        title={'ACMEs'}
        style={{ margin: '1em' }}
        columns={[{ title: 'Name', field: 'name' }]}
        data={data && data.currentUser ? data.currentUser.ACMEs : []}
        onRowClick={handleRowClick}
        editable={{
          onRowAdd: handleAddACME,
        }}
      />
    </>
  );
}
