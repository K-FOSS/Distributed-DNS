// API/src/Modules/Permission/UserInput.ts
import { InputType, Field, ID } from 'type-graphql';
import { Permission } from './Permission';

@InputType()
export class UserPermissionInput {
  @Field(() => ID)
  userId: string;

  @Field(() => Permission)
  accessPermission: Permission;
}
