// API/src/Modules/Zones/ZoneSettingsInput.ts
import { InputType, Field, ID } from 'type-graphql';
import { Permission } from '../Permission/Permission';

@InputType()
export class ZoneSettingsInput {
  @Field()
  stuff: string;
}

@InputType()
export class ZoneUserInput {
  @Field(() => ID)
  userId: string;

  @Field(() => Permission)
  accessPermission: Permission;
}
