// Web/UI/Routes/Subscribers/Subscriber/ClientConfigurationPanel.tsx
import React, { useState, useCallback, useRef } from 'react';
import { PaperSection } from 'UI/Components/Styles/Section/PaperSection';
import Typography from '@material-ui/core/Typography';
import BaseButtonCore from 'UI/Components/Styles/Button/BaseButton/BaseButtonCore';
import { useCreateSubscriberTokenMutation } from './CreateSubscriberToken.gen';
import { useParams } from 'react-router';
import { useConfig } from 'UI/Components/Providers/ConfigProvider';
import { useTextField } from 'UI/Components/Styles/Form/useTextField';
import { useSnackbar } from 'notistack';
import Prism from 'react-syntax-highlighter/dist/cjs/prism';

interface SubscriberPageParams {
  subscriberId: string;
}

export function ClientConfigurationPanel(): React.ReactElement {
  const { subscriberId } = useParams<SubscriberPageParams>();
  const [subscriberToken, setSubscriberToken] = useState<string>();
  const [createSubscriberToken] = useCreateSubscriberTokenMutation();
  const { baseUrl } = useConfig();
  const TextField = useTextField();
  const { enqueueSnackbar } = useSnackbar();
  const tokenInputRef = useRef<HTMLInputElement>(null);

  const handleGenerateConfiguration = useCallback(async () => {
    const response = await createSubscriberToken({
      variables: {
        subscriberId,
      },
    });

    if (response.data?.createSubscriberToken)
      setSubscriberToken(response.data.createSubscriberToken);
  }, []);

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
    labels:
      - com.distributed-dns.bind=true

  SubscriberDL:
    image: docker.pkg.github.com/kristianfjones/distributed-dns/distributed-dns-subscriberdl
    environment:
      SUBSCRIBER_TOKEN: ${subscriberToken}
      API_URL: ${baseUrl}
    volumes:
      - zoneFiles:/data/Zones
      - bindConfig:/data/BIND
      - stateData:/data/State
      - tlsData:/data/TLS
      - /var/run/docker.sock:/var/run/docker.sock

volumes:
  zoneFiles:
    driver: local

  bindConfig:
    driver: local
  
  stateData:
    driver: local
    
  tlsData:
    driver: local`;

  return (
    <PaperSection>
      <Typography variant='h4'>Client Configuration</Typography>
      {subscriberToken ? (
        <>
          <Typography variant='h4'>Subscriber Configuration</Typography>
          <Typography variant='body1'>
            Docker-compose service example
          </Typography>
          <Prism
            language='yaml'
            useInlineStyles
            customStyle={{ width: '100%' }}
          >
            {composeFile}
          </Prism>
          <TextField
            label='Subscriber Token'
            inputRef={tokenInputRef}
            variant='outlined'
            value={subscriberToken}
            style={{ marginTop: '1em' }}
          />
          <BaseButtonCore
            label='Copy Token To Clipboard'
            onClick={handleCopyTokenClick}
            style={{ marginTop: '1em' }}
            color='primary'
            variant='contained'
          />
        </>
      ) : (
        <BaseButtonCore
          label='Generate Configuration'
          variant='contained'
          color='primary'
          onClick={handleGenerateConfiguration}
        />
      )}
    </PaperSection>
  );
}
