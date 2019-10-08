// Web/UI/Routes/Home/index.tsx
import React from 'react';
import { Header } from 'UI/Components/Styles/Header';

export default function HomeRoute(): React.ReactElement {
  return (
    <>
      <Header title={{ primary: 'Distributed DNS' }} />
    </>
  );
}
