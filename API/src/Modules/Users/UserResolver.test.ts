// API/src/Modules/Users/UserResolver.test.ts
import { factory } from 'API/Library/Factory';
import { User } from './UserModel';
import { execute } from 'API/Library/execute';

describe('User Resolver', () => {
  describe('Users Query', () => {
    test('Query Users', async () => {
      await factory.for(User).create(5);

      const { data, errors } = await execute(
        `
        query Users {
          users {
            username
          }
        }
      `,
      );

      expect(data.users).toBeDefined();
      expect(data.users.length).toBeGreaterThanOrEqual(5);
      expect(errors).toBeUndefined();
    });

    test(`Query Users' Forbidden Data`, async () => {
      await factory.for(User).create(5);

      const { data, errors } = await execute(
        `
        query Users {
          users {
            username
            password
            email
          }
        }
      `,
      );

      expect(data.users).toBeDefined();
      expect(data.users.length).toBeGreaterThanOrEqual(5);
      expect(data.users[0].password).toBeUndefined();
      expect(data.users[0].email).toBeUndefined();
      expect(errors).toBeUndefined();
    });
  });

  describe('User Query', () => {
    test('Query User', async () => {
      const user = await factory.for(User).create(1);

      const { data, errors } = await execute(
        `
        query User {
          user(userId: "${user.id}") {
            username
            id
          }
        }
      `,
      );

      expect(data.user.username).toBe(user.username);
      expect(data.user.id).toBe(user.id);
      expect(errors).toBeUndefined();
    });

    test(`Query User's forbidden data`, async () => {
      const user = await factory.for(User).create(1);

      const { data, errors } = await execute(
        `
        query User {
          user(userId: "${user.id}") {
            username
            id
            email
            password
          }
        }
      `,
      );

      expect(data.email).toBeUndefined();
      expect(data.password).toBeUndefined();
      expect(errors).toBeUndefined();
    });
  });
});
