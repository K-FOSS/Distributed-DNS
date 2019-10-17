// Web/UI/Routes/ACMEs/ACMEs.tsx
import React from 'react';
import { ACMEsTable } from 'UI/Components/ACMEs/Table/ACMEsTable';
import { Header } from 'UI/Components/Styles/Header';

export default function ACMEsRoute(): React.ReactElement {
  return (
    <>
      <Header title={{ primary: 'ACMEs' }} />
      <ACMEsTable />
    </>
  );
}
