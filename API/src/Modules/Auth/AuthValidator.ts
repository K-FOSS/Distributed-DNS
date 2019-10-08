// API/src/Modules/Auth/Checker.ts
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from 'API/Modules/Users/UserModel';

@ValidatorConstraint({ async: true, name: 'isValid' })
export class UniqueUsernameConstraint implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    return (await User.count({ where: { username: value } })) === 0;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'This username is already in use.';
  }
}

@ValidatorConstraint({ async: true, name: 'isValid' })
export class UniqueEmailConstraint implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    return (await User.count({ where: { email: value } })) === 0;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'This email is already in use.';
  }
}
