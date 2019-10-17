// Web/UI/Components/Subscribers/Table/index.tsx
import React, { useCallback } from 'react';
import MaterialTable from 'material-table';
import { useSubscribersQuery } from '../GraphQL/Subscribers.gen';
import { Subscriber } from 'UI/GraphQL/graphqlTypes.gen';
import { useHistory } from 'react-router-dom';
import { useCreateSubscriberMutation } from '../GraphQL/CreateSubscriber.gen';

type SubscriberData = Pick<Subscriber, 'id' | 'name'>;

type RowClick<T> = (
  event?: React.MouseEvent,
  rowData?: T,
  toggleDetailPanel?: (panelIndex?: number) => void,
) => void;

export function SubscribersTable(): React.ReactElement {
  const history = useHistory();
  const { data } = useSubscribersQuery();
  const [createSubscriber] = useCreateSubscriberMutation();

  const handleAddSubscriber = useCallback(
    async (input: SubscriberData) => {
      const response = await createSubscriber({ variables: { input } });
      console.log(response);
      console.log(input);
    },
    [createSubscriber],
  );

  const handleEditSubscriber = useCallback(async (input: SubscriberData) => {
    console.log(input);
  }, []);

  const handleRowClick: RowClick<SubscriberData> = useCallback(
    (a, rowData) => rowData && history.push(`/Subscribers/${rowData.id}`),
    [history],
  );

  return (
    <MaterialTable
      title='Subscribers'
      style={{ margin: '1em' }}
      columns={[{ title: 'Name', field: 'name' }]}
      data={data && data.currentUser ? data.currentUser.subscribers : []}
      onRowClick={handleRowClick}
      editable={{
        onRowAdd: handleAddSubscriber,
        onRowUpdate: handleEditSubscriber,
      }}
    />
  );
}
