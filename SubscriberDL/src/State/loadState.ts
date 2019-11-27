// SubscriberDL/src/State/loadState.ts
import { readJson, pathExists } from 'fs-extra'
import { defaultState, statePath, SubscriberDLState } from '.'

export async function loadState(): Promise<SubscriberDLState> {
  const statePathExists = await pathExists(statePath)
  if (!statePathExists) return defaultState

  return readJson(statePath)
}
