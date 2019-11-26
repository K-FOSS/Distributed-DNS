// SubscriberDL/src/ACME/updateACME.ts
import { outputFile, pathExists, remove } from 'fs-extra'
import { loadState, saveState, statePath } from '../State'
import { AcmeFragment } from './GraphQL/ACME.gen'
import { config } from '../Config'
import { SubscriberTlsOutputMode } from '../graphqlTypes.gen'

export async function createUpdateACME(
  ACME: AcmeFragment,
): Promise<void | void[]> {
  const currentState = await loadState()

  let acmeState = currentState.ACMEs.find(({ id }) => id === ACME.id)
  if (acmeState) {
    if (acmeState.updatedDate === ACME.certificates[0].createdAt) return

    console.log('Updating existing Certificate')

    currentState.ACMEs[currentState.ACMEs.indexOf(acmeState)] = {
      ...currentState.ACMEs[currentState.ACMEs.indexOf(acmeState)],
      updatedDate: ACME.certificates[0].createdAt,
    }
  } else {
    acmeState = {
      id: ACME.id,
      updatedDate: ACME.certificates[0].createdAt,
      name: ACME.name,
    }
    currentState.ACMEs.push(acmeState)
  }

  await saveState(currentState)

  const { certificate, privateKey } = ACME.certificates[0]

  const certsFile = `${config.dataPath}/TLS/${ACME.name}.pem`
  const keyFile = `${config.dataPath}/TLS/${ACME.name}.key`

  if (currentState.Settings.TLSOutputMode === SubscriberTlsOutputMode.Dual) {
    return Promise.all([
      outputFile(keyFile, privateKey),
      outputFile(certsFile, certificate),
    ])
  }

  if (await pathExists(keyFile)) remove(keyFile)

  return outputFile(certsFile, certificate + privateKey)
}
