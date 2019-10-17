// API/src/Modules/ACMEs/ACMEPubSub.ts
import { EventEmitter } from 'events';
import { Certificate } from '../Certificates/CertificateModel';
import pEvent from 'p-event';
import { ACME } from './ACMEModel';

export class ACMEPubSub {
  public ee: EventEmitter = new EventEmitter();
  public async publish(acmeId: string, payload: Certificate) {
    this.ee.emit(acmeId, payload);
  }

  public async subscribe(
    ACMEToken: string,
  ): Promise<AsyncIterator<Certificate>> {
    const eventEmitter = this.ee;
    const acme = await ACME.getACMEFromToken(ACMEToken);

    async function* subscribeToACMEGen() {
      yield* pEvent.iterator(eventEmitter, acme.id);
    }

    return subscribeToACMEGen();
  }
  public async unsubscribe(subId: number) {}
}

export const acmePubSub = new ACMEPubSub();
