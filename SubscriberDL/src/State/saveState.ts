// SubscriberDL/src/State/saveState.ts
import { outputJson } from 'fs-extra'
import { SubscriberDLState, statePath } from '.'

/**
 * Saves the Javascript object to the `${DATA_PATH}/state.json`
 * @param state SubscriberDL State
 * @returns the Result of `outputJson(statePath, state)`
 */
export async function saveState(state: SubscriberDLState): Promise<void> {
  return outputJson(statePath, state)
}
