// Web/UI/Routes/Zones/ZoneSettings/ZoneManagementPanel.tsx
import React from 'react';
// import { useParams } from 'react-router';
import { PaperSection } from 'UI/Components/Styles/Section/PaperSection';
import Typography from '@material-ui/core/Typography';
import BaseButtonCore from 'UI/Components/Styles/Button/BaseButton/BaseButtonCore';
import useTheme from '@material-ui/styles/useTheme';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

/*
interface ZoneSettingsPageParams {
  zoneId: string;
} */

export function ZoneManagementPanel(): React.ReactElement {
  // const { zoneId } = useParams<ZoneSettingsPageParams>();
  const { palette } = useTheme<Theme>();

  return (
    <PaperSection>
      <Typography variant='h4'>Administration</Typography>

      <BaseButtonCore
        label='Delete Zone'
        variant='contained'
        style={{ backgroundColor: palette.error.main }}
      />
    </PaperSection>
  );
}
