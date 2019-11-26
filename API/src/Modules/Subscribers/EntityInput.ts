// API/src/Modules/Subscribers/EntityInput.ts
import { InputType, Field, ID } from 'type-graphql';
import { EntityType } from './EntityType';

@InputType()
export class EntityInput {
  @Field(() => EntityType)
  entityType: EntityType;

  @Field(() => ID)
  entityId: string;
}
