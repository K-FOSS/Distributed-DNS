// Web/UI/Routes/ACMEs/ACME/DomainsPanel.tsx
import React, { useMemo, ChangeEvent, useState, useCallback } from 'react';
import { AcmeQuery } from './ACME.gen';
import { LabelListItem } from 'UI/Components/Styles/List/ListItems/LabelListItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { PaperSection } from 'UI/Components/Styles/Section/PaperSection';
import { BaseList } from 'UI/Components/Styles/List/BaseList';
import { useAcmeZonesQuery } from './Zones.gen';
import { useImport } from 'UI/Components/Providers/ImportProvider';
import { Loader } from 'UI/Components/Styles/Loader';
import { BaseButton } from 'UI/Components/Styles/Button/BaseButton';
import { Zone } from 'UI/GraphQL/graphqlTypes.gen';
import { Permission } from 'Server/graphqlTypes.gen';
import { useAddAcmeDomainMutation } from './AddACMEDomains.gen';

interface ACMEDomainsPanelProps {
  acmeData: AcmeQuery | undefined;
}

interface Value {
  zone: ({ __typename?: 'Zone' } & Pick<Zone, 'id' | 'domainName'>) | undefined;

  domains: string | undefined;
}

type ValueChangeHandler = <T extends keyof Value>(
  field: T,
  value: Value[T],
) => void;

export function ACMEDomainsPanel({
  acmeData,
}: ACMEDomainsPanelProps): React.ReactElement {
  const [value, setValue] = useState<Value>({
    zone: undefined,
    domains: undefined,
  });
  const acmeId = useMemo(() => acmeData?.ACME.id || undefined, [acmeData]);
  const TextField = useImport({
    imported: import(
      'UI/Components/Styles/Inputs/TextField/BaseTextField/index'
    ),
    path: 'Components/Styles/Inputs/TextField/BaseTextField/index.tsx',
    // TODO: TextField Skeleton Loader
    Loader,
  });

  const handleValueChange: ValueChangeHandler = useCallback(
    (field, value) =>
      setValue((currentState) => ({ ...currentState, [field]: value })),
    [setValue],
  );

  const { data: acmeZones } = useAcmeZonesQuery();
  const [addACMEDomain] = useAddAcmeDomainMutation();

  const handleAddDomains = useCallback(async () => {
    const zoneId = value.zone?.id;
    const domains = value.domains?.split(',');

    if (!acmeId || !zoneId || !domains) return




    const response = await addACMEDomain({
      variables: {
        acmeId,
        input: [{ zoneId, domains }],
      },
    });

    console.log(response);
  }, [value, acmeId, addACMEDomain]);

  return (
    <PaperSection>
      <Typography variant='h4'>Domain Management</Typography>
      <BaseList>
        {(acmeData?.ACME.domains || []).map(
          ({ zone: { id: zoneId, domainName }, domains }) => (
            <LabelListItem
              label={{ primary: domainName, secondary: domains.join(',') }}
            ></LabelListItem>
          ),
        )}
      </BaseList>

      <div>
        <Typography variant='body1'>
          Select zone then enter the domains you want a TLS certificate for
          (Separated by commas, no spaces)
        </Typography>
        <Autocomplete
          options={acmeZones?.currentUser?.zones}
          getOptionLabel={(option) => option.domainName}
          onChange={(a, newValue) => handleValueChange('zone', newValue)}
          value={value.zone}
          style={{ marginTop: '1em', width: '100%' }}
          renderInput={(params) => (
            <TextField {...params} label='Zone' variant='outlined' fullWidth />
          )}
        />
        <TextField
          label='Domains'
          variant='outlined'
          style={{ marginTop: '1em', width: '100%' }}
          onChange={({ target }) => handleValueChange('domains', target.value)}
          value={value.domains}
        />
        <BaseButton
          label='Add TLS Zone'
          onClick={handleAddDomains}
          variant='contained'
          color='primary'
        />
      </div>
    </PaperSection>
  );
}
