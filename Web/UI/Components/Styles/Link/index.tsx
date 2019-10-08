// Web/UI/Components/Style/Link/index.tsx
import React, { PropsWithChildren, useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

interface LinkProps {
  to: string;
  preloadOnHover?: boolean;
  label: string;
}

export function Link({
  to,
  preloadOnHover,
  label,
}: PropsWithChildren<LinkProps>): React.ReactElement {
  const [loaded, setLoaded] = useState<boolean>(false);
  const toggleLoaded = useCallback(() => setLoaded((state) => !state), [
    setLoaded,
  ]);

  const preloadLink = useCallback(async () => {
    toggleLoaded();
  }, [toggleLoaded]);

  const handleHover = useCallback(
    () => preloadOnHover && !loaded && preloadLink(),
    [preloadOnHover, loaded, preloadLink],
  );

  return (
    <RouterLink to={to} onMouseOver={handleHover}>
      <Typography variant='body1'>{label}</Typography>
    </RouterLink>
  );
}
