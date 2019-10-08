// API/src/Modules/Auth/AuthResolver.ts
import { execute } from 'API/Library/execute';
import { factory } from 'API/Library/Factory';
import { User } from 'API/Modules/Users/UserModel';
import { Configuration } from '../Configurations/ConfigurationModel';
import { createConnection } from 'typeorm';
import { getConnectionArgs } from 'API/Library/getDbConnection';
import { getTestContext } from 'API/Context';

describe('Authentication Resolver', () => {
  beforeAll(async () => {
    const connection = await createConnection(getConnectionArgs(true));
    await connection.synchronize();

    await Promise.all([User.delete({}), factory.for(Configuration).create(1)]);
  });

  describe('currentUser Query', () => {
    test('Get currentUser', async () => {
      const user = await factory.for(User).create(1);

      const { data, errors } = await execute(
        `
        query {
          currentUser {
            id
            roles
          }
        }
        `,
        await getTestContext(user.id),
      );

      expect(data.currentUser).toBeDefined();
      expect(data.currentUser.id).toBe(user.id);
      expect(data.currentUser.roles).toStrictEqual(user.roles);
      expect(errors).toBeUndefined();
    });
  });

  describe('Login Mutation', () => {
    test('Login Test User', async () => {
      const user = await factory.for(User).create(1);

      const { data, errors } = await execute(
        `
        mutation { 
          login(input: { username: "${user.username}", password: "password" }) {
            token
            currentUser {
              id
            }
          }
        }
      `,
      );

      expect(data.login.token).toBeDefined();
      expect(data.login.currentUser.id).toBe(user.id);
      expect(errors).toBeUndefined();
    });

    test('Fail login with invalid password', async () => {
      const user = await factory.for(User).create(1);

      const { data, errors } = await execute(
        `
        mutation { 
          login(input: { username: "${user.username}", password: "INVALID PASSWORD" }) {
            token
            currentUser {
              id
            }
          }
        }
      `,
        { currentUser: undefined },
      );

      expect(data).toBeNull();
      expect(errors).toBeDefined();
      expect(errors![0].message).toBe('Argument Validation Error');
    });
  });

  describe('Register Mutation', () => {
    test('Sign Up User', async () => {
      const { data, errors } = await execute(
        `
        mutation {
          register(
            input: {
              username: "TestUser1"
              email: "testuser@example.com"
              password: "password"
            }
          ) {
            token

          }
        }
      `,
      );

      expect(data.register.token).toBeDefined();
      expect(errors).toBeUndefined();
    });
  });
});
