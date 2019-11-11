// Web/UI/Components/Subscribers/index.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSubscriberQuery } from './GraphQL/Subscriber.gen';
import { Header } from '../Styles/Header';
import { ZonesAutoSuggest, ZoneData } from '../Zones/AutoSuggest';
import { BaseButton } from '../Styles/Button/BaseButton';
import { PageSectionRoot } from '../Styles/Section/PageSectionRoot';
import { useStyles } from '../Styles';
import { PaperSection } from '../Styles/Section/PaperSection';
import { useUpdateSubscriberMutation } from './GraphQL/UpdateSubscriber.gen';
import { useSnackbar } from 'notistack';

interface SubscriberPageProps {
  subscriberId: string;
}

export function SubscriberPage({
  subscriberId,
}: SubscriberPageProps): React.ReactElement {
  const classes = useStyles();
  const { data } = useSubscriberQuery({ variables: { subscriberId } });
  const [selectedZones, setSelectedZones] = useState<ZoneData[]>([]);
  const [updateSubscriber] = useUpdateSubscriberMutation();
  const { enqueueSnackbar } = useSnackbar();
  const hasSet = useRef(false);

  useEffect(() => {
    if (hasSet.current === false && data) {
      setSelectedZones(data.subscriber.subscribedZones);
      hasSet!.current = true;
    }
  }, [data, selectedZones]);

  const handleSaveSubscriber = useCallback(async () => {
    if (!data) return;

    const removedZones = data.subscriber.subscribedZones.filter(
      (zone) => !selectedZones.includes(zone),
    );
    const addedZones = selectedZones.filter(
      (zone) => !data.subscriber.subscribedZones.includes(zone),
    );

    const response = await updateSubscriber({
      variables: {
        subscriberId,
        input: {
          addZoneIds: addedZones.map(({ id }) => id),
          removeZoneIds: removedZones.map(({ id }) => id),
        },
      },
    });
    if (response.data)
      enqueueSnackbar('Subscriber successfully updated', {
        variant: 'success',
      });
  }, [selectedZones, data, updateSubscriber, enqueueSnackbar, subscriberId]);

  return (
    <>
      <Header
        title={{
          primary:
            data && data.subscriber ? data.subscriber.name : 'Subscriber',
        }}
      />
      <div className={classes.pageRoot}>
        <PageSectionRoot>
          <PaperSection>
            <ZonesAutoSuggest
              selectedZones={selectedZones}
              setSelectedZones={setSelectedZones}
            />
            <BaseButton
              label='Save Settings'
              onClick={handleSaveSubscriber}
              color='primary'
              variant='contained'
            />
          </PaperSection>
        </PageSectionRoot>
      </div>
    </>
  );
}
