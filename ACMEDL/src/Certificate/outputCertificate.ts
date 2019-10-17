// ACMEDL/src/Certificates/outputCertificate.ts
import { outputFile } from 'fs-extra';
import { DATA_VOLUME } from '..';
import { CertificateData, CERTIFICATE_FILE, KEY_FILE } from '.';

export async function outputCertificate(
  certificateData: CertificateData,
): Promise<[void, void]> {
  const { privateKey, certificate } = certificateData;
  return Promise.all([
    outputFile(`${DATA_VOLUME}/${CERTIFICATE_FILE}`, certificate),
    outputFile(`${DATA_VOLUME}/${KEY_FILE}`, privateKey),
  ]);
}
