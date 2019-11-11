// Web/UI/Routes/Zones/ZoneSettings/index.tsx
import React from 'react';
import { Header } from 'UI/Components/Styles/Header';
import { useParams } from 'react-router';
import { useZoneSettingsQuery } from './ZoneSettings.gen';

interface ZoneSettingsPageParams {
  zoneId: string;
}

export default function ZoneSettingsPage(): React.ReactElement {
  const { zoneId } = useParams<ZoneSettingsPageParams>();
  const { data } = useZoneSettingsQuery({ variables: { zoneId } });

  console.log(data);

  return (
    <>
      <Header title={{ primary: 'Zone Settings' }} />
    </>
  );
}
