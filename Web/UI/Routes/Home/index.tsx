// Web/UI/Routes/Home/index.tsx
import React, { useCallback, useState } from 'react';
import BaseButtonCore from 'UI/Components/Styles/Button/BaseButton/BaseButtonCore';
import { Link } from 'UI/Components/Styles/Link';
import { Header } from 'UI/Components/Styles/Header';

export default function HomeRoute(): React.ReactElement {
  const [enabled, setEnabled] = useState<boolean>();

  const handleToggle = useCallback(() => setEnabled((state) => !state), [
    setEnabled,
  ]);

  return (
    <>
      <Header title={{ primary: 'APP NAME' }} />
      <BaseButtonCore label={'Hello'} onClick={handleToggle} />
      <Link to='/Test' label='Testing' preloadOnHover={enabled} />
      <Link to='/Example' label='Example' preloadOnHover={enabled} />
      <Link to='/Admin/Test' label='Admin' preloadOnHover={enabled} />
    </>
  );
}
