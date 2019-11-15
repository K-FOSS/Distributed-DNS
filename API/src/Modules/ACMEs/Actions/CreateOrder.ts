// API/src/Modules/ACMEs/Actions/CreateOrder.ts
import { ACMEDomain } from '../ACMEDomainModel';
import { ACMEAccount } from '../ACMEAccountModel';
import { Client, forge } from 'acme-client';
import { directoryUrl } from '../ACMEModel';
import { performAuthorizations } from './PerformAuthorizations';
import { Certificate } from 'API/Modules/Certificates/CertificateModel';

export async function createOrder(
  acmeId: string,
  acmeAccountId: string,
): Promise<Certificate> {
  const [domains, acmeAccount] = await Promise.all([
    ACMEDomain.find({
      where: { acmeId },
      relations: ['zone', 'zone.resourceRecords'],
    }),
    ACMEAccount.findOneOrFail(acmeAccountId),
  ]);

  const domainNames = domains.flatMap((domain) =>
    domain.domains.map((domain) => domain),
  );

  const client = new Client({
    accountKey: acmeAccount.accountKey,
    directoryUrl,
    accountUrl: acmeAccount.accountUrl,
  });

  const Order = await client.createOrder({
    identifiers: domainNames.map((domainName) => ({
      type: 'dns',
      value: domainName,
    })),
  });

  const authorizations = await client.getAuthorizations(Order);

  await performAuthorizations(client, authorizations, domains);

  const [privateKey, csr] = await forge.createCsr({
    commonName: domainNames[0],
    altNames: domainNames,
    keySize: 4096,
  });
  await client.finalizeOrder(Order, csr);

  const certificate = Certificate.create({
    certificate: await client.getCertificate(Order),
    privateKey: privateKey.toString(),
    acmeId,
  });

  return certificate.save();
}
