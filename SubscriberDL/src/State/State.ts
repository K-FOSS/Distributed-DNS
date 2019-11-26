// SubscriberDL/src/State/State.ts
import { config } from '../Config/'

export const statePath = `${config.dataPath}/State/state.json`

export interface ResourceRecordState {
  id: string
  data: string
}

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

export interface SubscriberDLState {
  zones: ZoneState[]
}

export const defaultState: SubscriberDLState = {
  zones: [],
}
