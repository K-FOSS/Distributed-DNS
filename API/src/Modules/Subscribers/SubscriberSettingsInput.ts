// API/src/Modules/Subscribers/SubscriberSettingsInput.ts
import { InputType, Field } from 'type-graphql';
import { SubscriberSettings } from './SubscriberSettingsModel';
import { SubscriberTLSOutputMode } from './SubscriberTLSOutputMode';

@InputType()
export class SubscriberSettingsInput implements Partial<SubscriberSettings> {
  @Field(() => SubscriberTLSOutputMode)
  TLSOutputMode: SubscriberTLSOutputMode;
}
