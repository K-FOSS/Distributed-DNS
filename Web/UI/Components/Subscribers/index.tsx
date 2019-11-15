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
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useCreateSubscriberTokenMutation } from './GraphQL/CreateSubscriberToken.gen';
// import SyntaxHighlighter from 'react-syntax-highlighter';
import Prism from 'react-syntax-highlighter/dist/cjs/prism';
import { useConfig } from '../Providers/ConfigProvider';

interface SubscriberPageProps {
  subscriberId: string;
}

export function SubscriberPage({
  subscriberId,
}: SubscriberPageProps): React.ReactElement {
  const { baseUrl } = useConfig();
  const classes = useStyles();
  const { data } = useSubscriberQuery({ variables: { subscriberId } });
  const [selectedZones, setSelectedZones] = useState<ZoneData[]>([]);
  const [updateSubscriber] = useUpdateSubscriberMutation();
  const [createSubscriberToken] = useCreateSubscriberTokenMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [subscriberToken, setSubscriberToken] = useState<string>();
  const hasSet = useRef(false);
  const tokenInputRef = useRef<HTMLInputElement>(null);

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

  const handleGenerateConfiguration = useCallback(async () => {
    const response = await createSubscriberToken({
      variables: {
        subscriberId,
      },
    });

    if (response.data?.createSubscriberToken) {
      enqueueSnackbar('Successfully created configuration', {
        variant: 'success',
      });
      setSubscriberToken(response.data.createSubscriberToken as string);
    }
  }, [
    subscriberId,
    createSubscriberToken,
    enqueueSnackbar,
    setSubscriberToken,
  ]);

  const handleCopyTokenClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (!tokenInputRef.current) {
        enqueueSnackbar('Error occured during copy', { variant: 'error' });
        return;
      }

      tokenInputRef.current.select();
      document.execCommand('copy');
      e.currentTarget.focus();

      enqueueSnackbar('Successfully copied token', { variant: 'success' });
    },
    [tokenInputRef, enqueueSnackbar],
  );

  const composeFile = `version: '3.7'
services:
  NS1:
    image: resystit/bind9:latest
    restart: unless-stopped
    container_name: 'NS'
    ports:
      - 53:53/tcp
      - 53:53/udp
    volumes:
      - zoneFiles:/Zones
      - bindConfig:/etc/bind/
  
  DNSDL:
    image: docker.pkg.github.com/kristianfjones/distributed-dns/distributed-dns-dnsdl:dnsdl
    environment:
      SUBSCRIBER_TOKEN: ${subscriberToken}
      API_URL: ${baseUrl}/graphql
    volumes:
      - zoneFiles:/data/Zones
      - bindConfig:/data/BIND
      - /var/run/docker.sock:/var/run/docker.sock

volumes:
  zoneFiles:
    driver: local

  bindConfig:
    driver: local`;

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

          <PaperSection>
            {subscriberToken ? (
              <>
                <Typography variant='h4'>Subscriber Configuration</Typography>
                <Typography variant='body1'>
                  Docker-compose service example
                </Typography>
                <Prism language='yaml'>{composeFile}</Prism>
                <TextField
                  label='Subscriber Token'
                  inputRef={tokenInputRef}
                  value={subscriberToken}
                  style={{ marginTop: '1em' }}
                />
                <BaseButton
                  label='Copy Token To Clipboard'
                  onClick={handleCopyTokenClick}
                  style={{ marginTop: '1em' }}
                  color='primary'
                  variant='contained'
                />
              </>
            ) : (
              <BaseButton
                label='Generate Config'
                onClick={handleGenerateConfiguration}
                color='primary'
                variant='contained'
              />
            )}
          </PaperSection>
        </PageSectionRoot>
      </div>
    </>
  );
}
