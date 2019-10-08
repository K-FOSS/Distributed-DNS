// Web/UI/Routes/TestRoute/index.tsx
import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { Header } from 'UI/Components/Styles/Header';

export default function TestRoute(): React.ReactElement {
  const test = 1;
  const handleClick = useCallback(() => {
    console.log(`I've been clicked\nTest: ${test}`);
  }, []);

  return (
    <>
      <Header title={{ primary: 'Test Route' }} background='secondary' />
      <div>
        <Button variant='contained' color='primary' onClick={handleClick}>
          Click Me
        </Button>
      </div>
    </>
  );
}
