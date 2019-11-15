// ACMEDL/src/Certificate/LoadCertificate.ts
import { readFile } from 'fs-extra';
import { DATA_VOLUME } from '..';
import { CERTIFICATE_FILE, KEY_FILE } from '.';

export interface CertificateObj {
  certificate: Buffer;
  privateKey: Buffer;
}

export async function loadCertificate(): Promise<CertificateObj> {
  const [certificate, privateKey] = await Promise.all([
    readFile(`${DATA_VOLUME}/${CERTIFICATE_FILE}`),
    readFile(`${DATA_VOLUME}/${KEY_FILE}`),
  ]);

  return { certificate, privateKey };
}
