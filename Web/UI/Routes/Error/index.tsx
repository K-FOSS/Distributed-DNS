// Web/UI/Routes/Error/index.tsx
import React from 'react';

interface ErrorRouteProps {
  code: number;
  message: string;
}

export default function ErrorRoute(props: ErrorRouteProps): React.ReactElement {
  return (
    <>
      <h1>Error</h1>
      <h2>{props.code.toString()}</h2>
    </>
  );
}
