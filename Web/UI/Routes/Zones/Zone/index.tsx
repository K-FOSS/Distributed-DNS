// Web/UI/Routes/Zones/Zone/index.tsx
import React from 'react';
import { useParams } from 'react-router';

interface ZonePageParams {
  zoneId: string;
}

export default function ZonePage(): React.ReactElement {
  const {} = useParams();
}
