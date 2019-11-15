// API/src/Modules/ACMEs/Actions/PerformAuthorizations.ts
import { Client, Authorization } from 'acme-client';
import { ResourceRecord } from 'API/Modules/ResourceRecords/ResourceRecordModel';
import { ResourceRecordType } from 'API/Modules/ResourceRecords/ResourceRecordTypes';
import { ACMEDomain } from '../ACMEDomainModel';

export async function performAuthorizations(
  client: Client,
  authorizations: Authorization[],
  domains: ACMEDomain[],
): Promise<void> {
  const tempRecords: ResourceRecord[] = [];

  for (const Auth of authorizations) {
    const resourceRecord = ResourceRecord.create({
      type: ResourceRecordType.TXT,
      ttl: 10,
    });

    try {
      const challenge = Auth.challenges
        .filter(({ type }) => type === 'dns-01')
        .pop();

      const domain = domains.find((domainItm) =>
        domainItm.domains.some((domainName) =>
          domainName.includes(Auth.identifier.value),
        ),
      );

      if (!challenge) throw new Error('INVALID Challenge');
      if (!domain) throw new Error('INVALID Domain');

      const host =
        Auth.identifier.value === domain.zone.domainName
          ? '_acme-challenge'
          : `_acme-challenge.${Auth.identifier.value.replace(
              `.${domain.zone.domainName}`,
              '',
            )}`;

      const keyAuthorization = await client.getChallengeKeyAuthorization(
        challenge,
      );

      resourceRecord.data = JSON.stringify({ value: keyAuthorization });
      resourceRecord.host = host;
      domain.zone.resourceRecords.push(resourceRecord);
      tempRecords.push(resourceRecord);
      await domain.zone.save();

      /* Notify ACME provider that challenge is satisfied */
      await client.completeChallenge(challenge);

      /* Wait for ACME provider to respond with valid status */
      await client.waitForValidStatus(challenge);
    } catch (error) {
      console.error(`Error occurred in ACME DNS Challenge`);
      console.error(error);
    }
  }

  try {
    console.log('Removing temp RRs');
    await ResourceRecord.remove(tempRecords);
  } catch {
    console.error('Error during removal of ACME Challenge RRs');
  }
}
