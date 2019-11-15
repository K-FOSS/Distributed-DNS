// API/src/Modules/Auth/CurrentUser.ts
import { Field, ObjectType } from 'type-graphql';
import { User } from 'API/Modules/Users/UserModel';
import { UserRole } from '../Users/UserRole';
import { Subscriber } from '../Subscribers/SubscriberModel';
import { Zone } from '../Zones/ZoneModel';
import { ACME } from '../ACMEs/ACMEModel';

@ObjectType()
export class CurrentUser extends User {
  @Field()
  email: string;

  @Field(() => UserRole)
  roles: UserRole[];

  @Field(() => [Subscriber])
  subscribers: Promise<Subscriber[]>;

  @Field(() => [Zone])
  zones: Promise<Zone[]>;

  @Field(() => [ACME])
  ACMEs: Promise<ACME[]>;
}
