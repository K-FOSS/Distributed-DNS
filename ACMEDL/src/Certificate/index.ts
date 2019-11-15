// ACMEDL/src/Certificate/index.ts
import { Certificate } from '../graphqlTypes.gen';

export type CertificateData = Pick<Certificate, 'privateKey' | 'certificate'>;

export const CERTIFICATE_FILE =
  process.env.CERTIFICATE_FILE || 'certificate.pem';
export const KEY_FILE = process.env.KEY_FILE || 'certificate.key';
