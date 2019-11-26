// Web/UI/Routes/Subscribers/Subscriber/index.tsx
import React, { useMemo } from 'react';
import { Header } from 'UI/Components/Styles/Header';
import { useParams } from 'react-router';
import { useSubscriberQuery } from './Subscriber.gen';
import { useSubscriberPageStyles } from './Styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsCog from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import { Permission } from 'Server/graphqlTypes.gen';

interface SubscriberPageParams {
  subscriberId: string;
}

export default function SubscriberPage(): React.ReactElement {
  const { subscriberId } = useParams<SubscriberPageParams>();

  const styles = useSubscriberPageStyles();

  const { data } = useSubscriberQuery({ variables: { subscriberId } });

  const userSubscriberPermissions = useMemo(
    () => data?.subscriber?.userPermissions || [Permission.Read],
    [data],
  );

  console.log(data);

  return (
    <>
      <Header title={{ primary: `${data?.subscriber.name || ''} Subscriber` }}>
        <Link
          to={`/Subscribers/${data?.subscriber.id}/Settings`}
          className={styles.headerSettingsLink}
        >
          {userSubscriberPermissions.includes(Permission.Admin) && (
            <IconButton className={styles.headerSettingsCog}>
              <SettingsCog />
            </IconButton>
          )}
        </Link>
      </Header>

      <div>
        <Typography variant='h5'>Subscriber Entities</Typography>
      </div>
    </>
  );
}
