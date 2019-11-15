// ACMEDL/src/Certificates/AnalyzeCertificate.ts
import { pki } from 'node-forge';

export function analyzeCertificate(certificateStr: string): pki.Certificate {
  return pki.certificateFromPem(certificateStr);
}
