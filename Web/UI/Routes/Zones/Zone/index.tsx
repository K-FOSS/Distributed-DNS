// Web/UI/Routes/Zones/Zone/index.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ZoneTable } from 'UI/Components/Zone/Table';
import { Header } from 'UI/Components/Styles/Header';
import { useStyles } from './Styles';
import { useZoneQuery } from './Zone.gen';
import IconButton from '@material-ui/core/IconButton';
import SettingsCog from '@material-ui/icons/Settings';

interface ZoneParams {
  zoneId: string;
}

export default function ZonePage(): React.ReactElement {
  const { zoneId } = useParams<ZoneParams>();
  const classes = useStyles();
  const { data } = useZoneQuery({ variables: { zoneId } });

  return (
    <>
      <Header title={{ primary: 'Zone' }}>
        <Link
          to={`/Zones/${data?.zone.id}/Settings`}
          className={classes.headerSettingsLink}
        >
          <IconButton className={classes.headerSettingsCog}>
            <SettingsCog />
          </IconButton>
        </Link>
      </Header>
      <ZoneTable zoneData={data?.zone} />
    </>
  );
}
