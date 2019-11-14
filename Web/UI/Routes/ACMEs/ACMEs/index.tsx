// Web/UI/Routes/ACMEs/ACMEs/index.tsx
import MaterialTable from 'material-table';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { Header } from 'UI/Components/Styles/Header';
import { Acme } from 'UI/GraphQL/graphqlTypes.gen';
import { useAcmEsQuery } from './ACMEs.gen';
import { useCreateAcmeMutation } from './CreateACME.gen';

type ACMEData = Pick<Acme, 'id' | 'name' | 'contactEmail'>;

type RowClick<T> = (
  event?: React.MouseEvent,
  rowData?: T,
  toggleDetailPanel?: (panelIndex?: number) => void,
) => void;

export default function ACMEsPage(): React.ReactElement {
  const history = useHistory();
  const { data } = useAcmEsQuery();
  const [createACME] = useCreateAcmeMutation();

  const handleAddACME = useCallback(
    async (input: Pick<ACMEData, 'name' | 'contactEmail'>) => {
      const response = await createACME({
        variables: {
          input: {
            name: input.name,
            email: input.contactEmail
          },
        },
      });
      console.log(response);
    },
    [],
  );

  const handleRowClick: RowClick<ACMEData> = useCallback(
    (a, rowData) => rowData && history.push(`/ACMEs/${rowData.id}`),
    [history],
  );

  return (
    <>
      <Header title={{ primary: 'ACMEs' }} />

      <MaterialTable
        title={'ACMEs'}
        style={{ margin: '1em' }}
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Contact Email', field: 'contactEmail' },
        ]}
        data={data?.currentUser?.ACMEs || ([] as ACMEData[])}
        onRowClick={handleRowClick}
        editable={{
          onRowAdd: handleAddACME,
          onRowUpdate: async () => {},
        }}
      />
    </>
  );
}
