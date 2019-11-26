// Web/UI/Routes/Subscribers/SubscriberSettings/index.tsx
import React from 'react';
import { useParams } from 'react-router';
// import { useSubscriberSettingsPageStyles } from './Styles';
import { useStyles } from 'UI/Components/Styles';
import { Header } from 'UI/Components/Styles/Header';
import { PageSectionRoot } from 'UI/Components/Styles/Section/PageSectionRoot';
import { useSubscriberSettingsQuery } from './SubscriberSettings.gen';
import { UserManagementPanel } from './UserManagementPanel';

interface SubscriberSettingsPageParams {
  subscriberId: string;
}

export default function SubscriberSettingsPage(): React.ReactElement {
  const { subscriberId } = useParams<SubscriberSettingsPageParams>();
  const { data } = useSubscriberSettingsQuery({ variables: { subscriberId } });
  // const styles = useSubscriberSettingsPageStyles();
  const classes = useStyles();

  console.log(data);

  return (
    <>
      <Header
        title={{ primary: `${data?.subscriber.name || 'Subscriber'} Settings` }}
      />

      <div className={classes.pageRoot}>
        <PageSectionRoot>
          <UserManagementPanel subscriberData={data} />
        </PageSectionRoot>
      </div>
    </>
  );
}
