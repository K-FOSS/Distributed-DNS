import React, { useState, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import { useHelloWorldQuery } from './helloWorld.gen';
import { Header } from 'UI/Components/Styles/Header';

export default function ExampleRoute(): React.ReactElement {
  const [enabled, setEnabled] = useState<boolean>(false);
  const { data } = useHelloWorldQuery();

  const toggleEnabled = useCallback(() => setEnabled((state) => !state), []);

  return (
    <>
      <Header title={{ primary: 'Example Route' }} background='secondary' />
      <Typography variant='h2' onClick={toggleEnabled}>
        {enabled ? 'True' : 'False'}
      </Typography>
      <Typography variant='h4'>{data ? data.helloWorld : 'Loading'}</Typography>
    </>
  );
}
