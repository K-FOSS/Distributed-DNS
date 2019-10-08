// Web/UI/Routes/Zones/Zones.tsx
import React from 'react';
import { Header } from 'UI/Components/Styles/Header';
import { ZonesTable } from 'UI/Components/Zones/Table';

export default function ZonesRoute(): React.ReactElement {
  return (
    <>
      <Header title={{ primary: 'Zones' }} />
      <ZonesTable />
    </>
  );
}
