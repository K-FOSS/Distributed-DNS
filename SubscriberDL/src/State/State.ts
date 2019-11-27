// SubscriberDL/src/State/State.ts
import { config } from '../Config/'
import {
  SubscriberSettings,
  SubscriberTlsOutputMode,
} from '../graphqlTypes.gen'

export const statePath = `${config.dataPath}/State/state.json`

export interface ZoneState {
  /**
   * Zone database ID
   */
  id: string

  /**
   * Zone domain name
   */
  domainName: string

  /**
   * Zone last updated At
   */
  updatedDate: Date
}

interface ACMEState {
  id: string
  name: string
  updatedDate: Date
}

export interface SubscriberDLState {
  zones: ZoneState[]
  ACMEs: ACMEState[]
  Settings: Pick<SubscriberSettings, 'TLSOutputMode'>
}

export const defaultState: SubscriberDLState = {
  zones: [],
  ACMEs: [],
  Settings: {
    TLSOutputMode: SubscriberTlsOutputMode.Single,
  },
}
