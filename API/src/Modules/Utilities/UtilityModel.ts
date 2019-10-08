// API/src/Modules/Utilities/UtilityModel.ts
import { ObjectType, ID, Field } from 'type-graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
export class Utility extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('varchar')
  name: string;
}
