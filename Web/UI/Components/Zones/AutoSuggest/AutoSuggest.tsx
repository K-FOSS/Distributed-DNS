// Web/UI/Components/Zones/AutoSuggest/AutoSuggest.tsx
import React, {
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  ChangeEvent,
  useRef,
} from 'react';
import Paper from '@material-ui/core/Paper';
import { useZonesQuery } from '../GraphQL/Zones.gen';
import { useImport } from 'UI/Components/Providers/ImportProvider';
import { Loader } from 'UI/Components/Styles/Loader';
import { useStyles } from './Styles';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import { Zone } from 'UI/GraphQL/graphqlTypes.gen';

export type ZoneData = Pick<Zone, 'domainName' | 'id'>;

interface AutoSuggestProps {
  selectedZones: ZoneData[];
  setSelectedZones: Dispatch<SetStateAction<ZoneData[]>>;
}

interface State {
  domainFilter: string;
  hideSuggest: boolean;
}

type HandleStateChange = <T extends keyof State>(
  key: T,
  value: State[T],
) => void;

export function ZonesAutoSuggest({
  selectedZones,
  setSelectedZones,
}: AutoSuggestProps): React.ReactElement {
  const classes = useStyles({});
  const { data } = useZonesQuery();
  const inputRef = useRef<HTMLInputElement>();

  const [state, setState] = useState<State>({
    domainFilter: '',
    hideSuggest: true,
  });

  const TextField = useImport({
    imported: import(
      'UI/Components/Styles/Inputs/TextField/BaseTextField/index'
    ),
    path: 'Components/Styles/Inputs/TextField/BaseTextField/index.tsx',
    Loader,
  });

  const handleStateChange: HandleStateChange = useCallback(
    (field, value) =>
      setState((currentState) => ({ ...currentState, [field]: value })),
    [setState],
  );

  const handleToggleHideSuggest = useCallback(
    (value: boolean) => handleStateChange('hideSuggest', value),
    [handleStateChange],
  );

  const handleZoneFilterChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) =>
      handleStateChange('domainFilter', target.value),
    [handleStateChange],
  );

  const handleAddZone = useCallback(
    (zone: ZoneData) => {
      setSelectedZones((selectedZonesState) => [...selectedZonesState, zone]);
      setState({ hideSuggest: true, domainFilter: '' });
    },
    [setSelectedZones, setState],
  );

  const handleDeleteZone = useCallback(
    (zone: ZoneData) =>
      setSelectedZones((selectedZoneState) =>
        selectedZoneState
          ? selectedZoneState.filter((selectedZone) => selectedZone !== zone)
          : [],
      ),
    [setSelectedZones],
  );

  const filteredZones = useMemo(
    () =>
      data && data.currentUser ? (
        data.currentUser.zones
          .filter(
            (zone) =>
              zone.domainName.includes(state.domainFilter) &&
              !selectedZones.find(({ id }) => zone.id === id),
          )
          .map((zone) => (
            <MenuItem key={zone.id} onClick={() => handleAddZone(zone)}>
              {zone.domainName}
            </MenuItem>
          ))
      ) : (
        <></>
      ),
    [data, state, selectedZones, handleAddZone],
  );

  const suggestMemo = useMemo(
    () =>
      state.hideSuggest ? (
        <></>
      ) : (
        <Paper
          className={classes.suggestPaper}
          style={{
            width: inputRef.current ? `${inputRef.current.clientWidth}px` : '',
          }}
        >
          {filteredZones}
        </Paper>
      ),
    [classes.suggestPaper, state.hideSuggest, filteredZones, inputRef],
  );

  return (
    <div>
      <TextField
        onFocus={() => handleToggleHideSuggest(false)}
        label='Zones'
        variant='outlined'
        value={state.domainFilter}
        onChange={handleZoneFilterChange}
        innerRef={inputRef}
        fullWidth
        multiline
        onBlur={() => setTimeout(() => handleToggleHideSuggest(true), 200)}
        InputProps={{
          startAdornment: selectedZones.map((item) => (
            <Chip
              key={item.id}
              tabIndex={-1}
              label={item.domainName}
              className={classes.chip}
              onDelete={() => handleDeleteZone(item)}
            />
          )),
          className: classes.inputRoot,
        }}
      />
      {suggestMemo}
    </div>
  );
}
