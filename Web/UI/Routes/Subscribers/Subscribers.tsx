// Web/UI/Routes/Subscribers/Subscribers.tsx
import React from 'react';
import { Header } from 'UI/Components/Styles/Header';
import { SubscribersTable } from 'UI/Components/Subscribers/Table';

export default function SubscribersRoute(): React.ReactElement {
  return (
    <>
      <Header title={{ primary: 'Subscribers' }} />
      <SubscribersTable />
    </>
  );
}
