// Web/UI/Routes/Subscribers/Subscriber/NewEntityPanel.tsx
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { PaperSection } from 'UI/Components/Styles/Section/PaperSection';
import { SubscriberEntity } from 'UI/GraphQL/graphqlTypes.gen';

export function NewEntityPanel(): React.ReactElement {
  const [entityType, setEntityType] = useState<SubscriberEntity>();

  return (
    <PaperSection>
      <Typography variant='h4'>Add Subscriber Entity</Typography>
      <div></div>
    </PaperSection>
  );
}
