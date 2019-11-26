// Web/UI/Components/Zone/ResourceRecord/EditComponent/SRVComponent.tsx
import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { useTextField } from 'UI/Components/Styles/Form/useTextField';
import { SrvProtocol } from 'UI/GraphQL/graphqlTypes.gen';
import { useStyles } from './Styles';

interface SRVComponentProps {
  value: string;
  onChange: (value: string) => void;
}

interface SRVRR {
  service: string;
  protocol: SrvProtocol;
  priority: number;
  weight: number;
  port: number;
  target: string;
}

export function SRVEditComponent({
  value,
  onChange,
}: SRVComponentProps): React.ReactElement {
  const TextField = useTextField();
  const classes = useStyles();

  const valueObj = useMemo(
    (): SRVRR =>
      value
        ? JSON.parse(value)
        : {
            service: '',
            protocol: SrvProtocol.Tcp,
            priority: 0,
            weight: 0,
            port: 0,
            target: '',
          },
    [value],
  );

  const handleChange = useCallback(
    (prop: keyof SRVRR) => ({ target }: ChangeEvent<HTMLInputElement>) =>
      onChange(JSON.stringify({ ...valueObj, [prop]: target.value })),
    [valueObj, onChange],
  );

  return (
    <div className={classes.doubleTextField}>
      <TextField
        label='Service'
        variant='outlined'
        className={classes.doubleTextLeft}
        value={valueObj.service}
        onChange={handleChange('service')}
      />
      <TextField
        select
        variant='outlined'
        value={valueObj.protocol}
        className={classes.doubleTextLeft}
        onChange={handleChange('protocol')}
        SelectProps={{
          native: true,
        }}
        classes={{
          root: classes.srvProtoSelect,
        }}
        fullWidth
      >
        {Object.entries(SrvProtocol).map(([, value], i) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </TextField>
      <TextField
        label='Priority'
        variant='outlined'
        value={valueObj.priority}
        className={classes.doubleTextLeft}
        onChange={handleChange('priority')}
      />
      <TextField
        label='Weight'
        variant='outlined'
        value={valueObj.weight}
        className={classes.doubleTextLeft}
        onChange={handleChange('weight')}
      />
      <TextField
        label='Port'
        variant='outlined'
        value={valueObj.port}
        className={classes.doubleTextLeft}
        onChange={handleChange('port')}
      />
      <TextField
        label='Target'
        variant='outlined'
        value={valueObj.target}
        InputProps={{
          className: classes.srvTargetField,
        }}
        onChange={handleChange('target')}
      />
    </div>
  );
}
