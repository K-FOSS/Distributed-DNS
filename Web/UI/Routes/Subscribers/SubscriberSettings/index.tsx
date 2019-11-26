// Web/UI/Routes/Subscribers/SubscriberSettings/index.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router';
import Typography from '@material-ui/core/Typography';
// import { useSubscriberSettingsPageStyles } from './Styles';
import { useStyles } from 'UI/Components/Styles';
import { Header } from 'UI/Components/Styles/Header';
import { PageSectionRoot } from 'UI/Components/Styles/Section/PageSectionRoot';
import { useSubscriberSettingsQuery } from './SubscriberSettings.gen';
import { UserManagementPanel } from './UserManagementPanel';
import { SubscriberTlsOutputMode } from 'UI/GraphQL/graphqlTypes.gen';
import { PaperSection } from 'UI/Components/Styles/Section/PaperSection';
import { useTextField } from 'UI/Components/Styles/Form/useTextField';
import { useUpdateSubscriberMutation } from './UpdateSubscriber.gen';
import BaseButtonCore from 'UI/Components/Styles/Button/BaseButton/BaseButtonCore';

interface SubscriberSettingsPageParams {
  subscriberId: string;
}

interface Value {
  TLSOutputMode: SubscriberTlsOutputMode;
}

export default function SubscriberSettingsPage(): React.ReactElement {
  const { subscriberId } = useParams<SubscriberSettingsPageParams>();

  const [value, setValue] = useState<Value>();

  const { data } = useSubscriberSettingsQuery({
    variables: { subscriberId },
    onCompleted: ({
      subscriber: {
        subscriberSettings: { __typename, id, ...subscriberSettings },
      },
    }) => setValue({ ...subscriberSettings }),
  });

  const [updateSubscriber] = useUpdateSubscriberMutation({
    variables: {
      subscriberId,
      input: value!,
    },
  });

  // const styles = useSubscriberSettingsPageStyles();
  const classes = useStyles();
  const TextField = useTextField();

  return (
    <>
      <Header
        title={{ primary: `${data?.subscriber.name || 'Subscriber'} Settings` }}
      />

      <div className={classes.pageRoot}>
        <PageSectionRoot>
          <UserManagementPanel subscriberData={data} />

          <PaperSection>
            <Typography variant='h4'>TLS Settings</Typography>

            <TextField
              select
              variant='outlined'
              label=''
              value={value?.TLSOutputMode}
              onChange={({ target }) =>
                setValue((currentValue) => ({
                  ...currentValue,
                  TLSOutputMode: target.value as any,
                }))
              }
              SelectProps={{
                native: true,
              }}
              fullWidth
            >
              {Object.entries(SubscriberTlsOutputMode).map(([, value], i) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </TextField>
            <BaseButtonCore
              label='Save Settings'
              color='primary'
              variant='contained'
              onClick={() => updateSubscriber()}
            />
          </PaperSection>
        </PageSectionRoot>
      </div>
    </>
  );
}
