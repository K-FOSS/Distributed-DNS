// API/src/Modules/Users/UserModel.test.ts
import { factory } from 'API/Library/Factory';
import { User } from './UserModel';
import { validatePassword } from '../Auth/AuthController';

describe('User', () => {
  describe('Authenication', () => {
    describe('Password Tests', () => {
      test('Valid Password Test', async () => {
        const user = await factory.for(User).create(1);
        expect(user.username).not.toBeUndefined();

        expect(validatePassword('password', user.hashedPassword)).resolves.toBe(
          true,
        );
        await user.remove();
      });

      test('Invalid Password Tests', async () => {
        const user = await factory.for(User).create(1);
        expect(user.username).not.toBeUndefined();
        expect(
          validatePassword('notpassword', user.hashedPassword),
        ).resolves.toBe(false);

        await user.remove();
      });
    });
  });
});
