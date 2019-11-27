// Web/UI/Routes/Subscribers/Subscriber/index.tsx
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SettingsCog from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import React, { useMemo, useCallback, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Permission } from 'Server/graphqlTypes.gen';
import { useStyles } from 'UI/Components/Styles';
import { Header } from 'UI/Components/Styles/Header';
import { PageSectionRoot } from 'UI/Components/Styles/Section/PageSectionRoot';
import { PaperSection } from 'UI/Components/Styles/Section/PaperSection';
import { useSubscriberPageStyles } from './Styles';
import { useSubscriberQuery } from './Subscriber.gen';
import { BaseList } from 'UI/Components/Styles/List/BaseList';
import { LabelListItem } from 'UI/Components/Styles/List/ListItems/LabelListItem';
import { useTextField } from 'UI/Components/Styles/Form/useTextField';
import { EntityType, SubscriberEntity } from 'UI/GraphQL/graphqlTypes.gen';
import { BaseButton } from 'UI/Components/Styles/Button/BaseButton';
import { useNewEntityQuery } from './NewEntity.gen';
import { useAddEntityToSubscriberMutation } from './AddEntityToSubscriber.gen';
import { useRemoveEntityFromSubscriberMutation } from './RemoveEntityFromSubscriber.gen';
import { useSnackbar } from 'notistack';
import { ClientConfigurationPanel } from './ClientConfigurationPanel';

interface SubscriberPageParams {
  subscriberId: string;
}

export default function SubscriberPage(): React.ReactElement {
  const { subscriberId } = useParams<SubscriberPageParams>();
  const { enqueueSnackbar } = useSnackbar();

  const styles = useSubscriberPageStyles();
  const classes = useStyles();
  const TextField = useTextField();

  const { data } = useSubscriberQuery({ variables: { subscriberId } });
  const { data: newEntitiesData } = useNewEntityQuery();

  const [addEntityToSubscriber] = useAddEntityToSubscriberMutation();
  const [removeEntityFromSubscriber] = useRemoveEntityFromSubscriberMutation();

  const [newEntity, setNewEntity] = useState<SubscriberEntity>();
  const [entityType, setEntityType] = useState<EntityType>(EntityType.Zone);

  const handleRemoveEntityFromSubscriber = useCallback(
    async (entityId: string) => {
      const response = await removeEntityFromSubscriber({
        variables: {
          subscriberId,
          entityIds: [entityId],
        },
      });

      if (response.data?.removeEntityFromSubscriber) {
        console.log(response);
      } else {
        console.error(`Delete entity failed`);
        enqueueSnackbar('Failed to delete entity from Subscription', {
          variant: 'error',
        });
      }
    },
    [subscriberId, removeEntityFromSubscriber, enqueueSnackbar],
  );

  const userSubscriberPermissions = useMemo(
    () => data?.subscriber?.userPermissions || [Permission.Read],
    [data],
  );

  const entityList = useMemo(
    () =>
      (data?.subscriber.subscribedEntities || []).map((entity) => {
        const type = 'name' in entity ? 'TLS' : 'Zone';

        const name = 'name' in entity ? entity.name : entity.domainName;
        return (
          <LabelListItem
            key={entity.id}
            label={{ primary: name, secondary: type }}
          >
            {userSubscriberPermissions.includes(Permission.Write) && (
              <IconButton
                onClick={() => handleRemoveEntityFromSubscriber(entity.id)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </LabelListItem>
        );
      }),
    [data, userSubscriberPermissions, handleRemoveEntityFromSubscriber],
  );

  const handleAddNewEntity = useCallback(async () => {
    console.log('Adding new Entity');
    if (!newEntity) {
      console.error('New Entity must be selected');

      return;
    }

    const response = await addEntityToSubscriber({
      variables: {
        subscriberId,
        newEntities: [
          {
            entityId: newEntity.id,
            entityType,
          },
        ],
      },
    });

    console.log(response);
  }, [subscriberId, newEntity, addEntityToSubscriber, entityType]);

  console.log(data);

  return (
    <>
      <Header title={{ primary: `${data?.subscriber.name || ''} Subscriber` }}>
        <Link
          to={`/Subscribers/${data?.subscriber.id}/Settings`}
          className={styles.headerSettingsLink}
        >
          {userSubscriberPermissions.includes(Permission.Admin) && (
            <IconButton className={styles.headerSettingsCog}>
              <SettingsCog />
            </IconButton>
          )}
        </Link>
      </Header>

      <div className={classes.pageRoot}>
        <PageSectionRoot>
          <PaperSection>
            <Typography variant='h4'>Entities</Typography>
            <BaseList style={{ width: '100%' }}>{entityList}</BaseList>
            {userSubscriberPermissions.includes(Permission.Write) && (
              <Grid
                container
                direction='row'
                spacing={1}
                alignItems='center'
                justify='center'
              >
                <Grid item xs={5} md={5} lg={5}>
                  <Autocomplete
                    options={
                      entityType === EntityType.Zone
                        ? newEntitiesData?.currentUser?.zones
                        : newEntitiesData?.currentUser?.ACMEs
                    }
                    getOptionLabel={(option: SubscriberEntity) =>
                      'domainName' in option ? option.domainName : option.name
                    }
                    value={newEntity}
                    onChange={(test, entity) => setNewEntity(entity)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='New Entity'
                        fullWidth
                        variant='outlined'
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4} md={3} lg={4}>
                  <TextField
                    select
                    variant='outlined'
                    value={entityType}
                    onChange={({ target }) =>
                      setEntityType(target.value as any)
                    }
                    SelectProps={{
                      native: true,
                    }}
                    fullWidth
                  >
                    {Object.entries(EntityType).map(([, value], i) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={3} lg={2} md={2}>
                  <BaseButton
                    label='Add'
                    onClick={handleAddNewEntity}
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                    color='primary'
                    variant='contained'
                    fullWidth
                  >
                    <CircularProgress
                      style={{ color: 'white', marginRight: '1em' }}
                      size={25}
                    />
                  </BaseButton>
                </Grid>
              </Grid>
            )}
          </PaperSection>
          {userSubscriberPermissions.includes(Permission.Write) && (
            <ClientConfigurationPanel />
          )}
        </PageSectionRoot>
      </div>
    </>
  );
}
