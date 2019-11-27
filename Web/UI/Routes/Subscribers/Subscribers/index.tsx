// Web/UI/Routes/Subscribers/Subscribers/index.tsx
import React, { useCallback } from 'react';
import { Header } from 'UI/Components/Styles/Header';
import { useSubscribersQuery } from './Subscribers.gen';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useCreateSubscriberMutation } from './CreateSubscriber.gen';
import { Subscriber, Permission } from 'UI/GraphQL/graphqlTypes.gen';
import { useDeleteSubscriberMutation } from './DeleteSubscriber.gen';

type SubscriberData = Pick<
  Subscriber,
  'id' | 'name' | 'userAccess' | 'userPermissions'
>;

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
  const [deleteSubscriber] = useDeleteSubscriberMutation();

  const handleAddSubscriber = useCallback(
    async (input: SubscriberData) => {
      const response = await createSubscriber({ variables: { input } });

      if (response.data?.createSubscriber)
        enqueueSnackbar('Successfully added subscriber', {
          variant: 'success',
        });
      else {
        console.error('Error occurred during the creation of a Subscriber');
        enqueueSnackbar(
          'Unknown error occurred during the creation of a subscriber',
        );
      }
    },
    [createSubscriber, enqueueSnackbar],
  );

  const handleEditSubscriber = useCallback(async (input: SubscriberData) => {
    console.log(input);
  }, []);

  const handleDeleteSubscriber = useCallback(
    async (subscriberData: SubscriberData) => {
      const response = await deleteSubscriber({
        variables: {
          subscriberId: subscriberData.id,
        },
      });

      if (response.data?.deleteSubscriber)
        enqueueSnackbar('Successfully deleted Subscriber', {
          variant: 'success',
        });
      else {
        console.error(
          'Unknown error occurred during the deletion of the Subscriber',
        );
        enqueueSnackbar('Unknown error occurred during deletion');
      }
      console.log('Deleting Subscriber: ', subscriberData);
    },
    [deleteSubscriber, enqueueSnackbar],
  );

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
          onRowDelete: handleDeleteSubscriber,
        }}
      />
    </>
  );
}
