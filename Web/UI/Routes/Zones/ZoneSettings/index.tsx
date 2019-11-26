// Web/UI/Routes/Zones/ZoneSettings/index.tsx
import React from 'react';
import { useParams } from 'react-router';
import { useStyles } from 'UI/Components/Styles';
import { Header } from 'UI/Components/Styles/Header';
import { PageSectionRoot } from 'UI/Components/Styles/Section/PageSectionRoot';
import { User } from 'UI/GraphQL/graphqlTypes.gen';
import { UserManagementPanel } from './UserManagementPanel';
import { useZoneSettingsQuery } from './ZoneSettings.gen';
import { ZoneManagementPanel } from './ZoneManagementPanel';

interface ZoneSettingsPageParams {
  zoneId: string;
}

export type UserData = Pick<User, 'username' | 'id'>;

export default function ZoneSettingsPage(): React.ReactElement {
  const { zoneId } = useParams<ZoneSettingsPageParams>();
  const classes = useStyles();
  const { data } = useZoneSettingsQuery({
    variables: {
      zoneId,
    },
  });

  return (
    <>
      <Header title={{ primary: 'Zone Settings' }} />
      <div className={classes.pageRoot}>
        <PageSectionRoot>
          <UserManagementPanel zoneData={data} />
        </PageSectionRoot>
      </div>
    </>
  );
}
