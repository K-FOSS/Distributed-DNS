// Web/UI/Routes/Subscribers/Subscribers/index.tsx
import React, { useCallback } from 'react';
import { Header } from 'UI/Components/Styles/Header';
import { useSubscribersQuery } from './Subscribers.gen';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useCreateSubscriberMutation } from './CreateSubscriber.gen';
import { Subscriber, Permission } from 'UI/GraphQL/graphqlTypes.gen';

type SubscriberData = Pick<Subscriber, 'id' | 'name'>;

type RowClick<T> = (
  event?: React.MouseEvent,
  rowData?: T,
  toggleDetailPanel?: (panelIndex?: number) => void,
) => void;

export default function SubscribersPage(): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const { data } = useSubscribersQuery();
  const [createSubscriber] = useCreateSubscriberMutation();

  const handleAddSubscriber = useCallback(
    async (input: SubscriberData) => {
      const response = await createSubscriber({ variables: { input } });

      if (response.data?.createSubscriber)
        enqueueSnackbar('Successfully added subscriber', {
          variant: 'success',
        });
    },
    [createSubscriber, enqueueSnackbar],
  );

  const handleEditSubscriber = useCallback(async (input: SubscriberData) => {
    console.log(input);
  }, []);

  const handleRowClick: RowClick<SubscriberData> = useCallback(
    (a, rowData) => rowData && history.push(`/Subscribers/${rowData.id}`),
    [history],
  );

  return (
    <>
      <Header title={{ primary: 'Subscribers' }} />
      <MaterialTable
        title='Subscribers'
        style={{ margin: '1em' }}
        columns={[{ title: 'Name', field: 'name' }]}
        data={data && data.currentUser ? data.currentUser.subscribers : []}
        onRowClick={handleRowClick}
        editable={{
          isDeletable: (rowData) =>
            rowData.userPermissions.includes(Permission.Admin),
          isEditable: (rowData) =>
            rowData.userPermissions.includes(Permission.Write),
          onRowAdd: handleAddSubscriber,
          onRowUpdate: handleEditSubscriber,
          onRowDelete: async (a) => console.log(a),
        }}
      />
    </>
  );
}
