// SubscriberDL/src/ACME/updateACME.ts
import { outputFile, pathExists, remove } from "fs-extra";
import { loadState, saveState, statePath } from "../State";
import { AcmeFragment } from "./GraphQL/ACME.gen";
import { config } from "../Config";
import { SubscriberTlsOutputMode } from "../graphqlTypes.gen";
import { restartWebContainer } from "../Docker";

/**
 * Create or Update a ACME Certificate/Key pair on this Subscriber
 * @param ACME ACME
 */
export async function createUpdateACME(
  ACME: AcmeFragment
): Promise<void | void[]> {
  const currentState = await loadState();

  // Get the local state of the ACME Subscriber Entity
  let acmeState = currentState.ACMEs.find(({ id }) => id === ACME.id);

  if (acmeState) {
    // If certificates date is unchanged nothing is needed.
    if (acmeState.updatedDate === ACME.certificates[0].createdAt) return;

    currentState.ACMEs[currentState.ACMEs.indexOf(acmeState)] = {
      ...currentState.ACMEs[currentState.ACMEs.indexOf(acmeState)],
      updatedDate: ACME.certificates[0].createdAt
    };
  } else {
    // Create new ACME State if it is undefined
    acmeState = {
      id: ACME.id,
      updatedDate: ACME.certificates[0].createdAt,
      name: ACME.name
    };
    currentState.ACMEs.push(acmeState);
  }

  await saveState(currentState);

  const { certificate, privateKey } = ACME.certificates[0];

  const certsFile = `${config.dataPath}/TLS/${ACME.name}.pem`;
  const keyFile = `${config.dataPath}/TLS/${ACME.name}.key`;

  if (currentState.Settings.TLSOutputMode === SubscriberTlsOutputMode.Dual) {
    await Promise.all([
      outputFile(keyFile, privateKey),
      outputFile(certsFile, certificate)
    ]);
  } else {
    if (await pathExists(keyFile)) remove(keyFile);

    await outputFile(certsFile, certificate + privateKey);
  }

  await restartWebContainer();
}
