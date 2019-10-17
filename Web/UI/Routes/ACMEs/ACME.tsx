// Web/UI/Routes/ACMEs/ACME.tsx
import React from 'react';
import { useParams, Redirect } from 'react-router-dom';

interface ACMEParams {
  acmeId: string;
}

export default function ACMERoute(): React.ReactElement {
  const params = useParams<ACMEParams>();

  if (!params.acmeId) return <Redirect to='/ACMEs' />;
  else return <div>{params.acmeId}</div>;
}
