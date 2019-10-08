// Web/UI/Routes/Admin/Home.tsx
import React from 'react';
import { Header } from 'UI/Components/Styles/Header';

export default function AdminHomeRoute(): React.ReactElement {
  return (
    <>
      <Header title={{ primary: 'Adminstration' }} background='secondary' />
    </>
  );
}
