// API/Modules/User/UserFactory.ts
import { DeepEntityPartial } from '@entity-factory/core';
import { TypeormBlueprint } from '@entity-factory/typeorm';
import { User } from './UserModel';
import { hashPassword } from '../Auth/AuthController';
import { UserRole } from './UserRole';

export class UserFactory extends TypeormBlueprint<User> {
  constructor() {
    super();

    this.type(User);

    this.state(
      UserRole.ADMIN,
      async ({ faker, factory }): Promise<DeepEntityPartial<User>> => {
        const firstName = faker.name.firstName();
        return {
          username: firstName,
          hashedPassword: await hashPassword('password'),
          email: faker.internet.email(firstName),
          roles: [UserRole.USER, UserRole.ADMIN],
        };
      },
    );

    this.define(
      async ({ faker, factory }): Promise<DeepEntityPartial<User>> => {
        const firstName = faker.name.firstName();
        return {
          username: firstName,
          hashedPassword: await hashPassword('password'),
          email: faker.internet.email(firstName),
          roles: [UserRole.USER],
        };
      },
    );
  }
}
