// API/src/Modules/Configurations/ConfigurationModel.ts
import { ObjectType, ID, Field } from 'type-graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { Min, Max } from 'class-validator';

@ObjectType()
@Entity()
export class Configuration extends BaseEntity {
  @Field(() => ID)
  @Min(1)
  @Max(1)
  @PrimaryGeneratedColumn()
  id: number;

  static hasCompletedSetup = async (): Promise<boolean> =>
    (await Configuration.count({ id: 1 })) > 0;
}
