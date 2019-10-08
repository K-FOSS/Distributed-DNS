// Web/UI/Routes/Zones/Zone.tsx
import React from 'react';
import { useParams, Redirect } from 'react-router';
import { ZoneTable } from 'UI/Components/Zone/Table';
import { Header } from 'UI/Components/Styles/Header';

interface ZoneParams {
  zoneId: string;
}

export default function ZoneRoute(): React.ReactElement {
  const { zoneId } = useParams<ZoneParams>();

  if (!zoneId) return <Redirect to='/Zones' />;
  else
    return (
      <>
        <Header title={{ primary: 'Zone' }} />
        <ZoneTable zoneId={zoneId} />
      </>
    );
}
