// Web/UI/Routes/Admin/Home.tsx
import React from 'react';
import { Header } from 'UI/Components/Styles/Header';
import { NewZoneForm } from 'UI/Components/Zones/NewZoneForm';

export default function AdminHomeRoute(): React.ReactElement {
  return (
    <>
      <Header title={{ primary: 'Adminstration' }} background='secondary' />
      <NewZoneForm />
    </>
  );
}
