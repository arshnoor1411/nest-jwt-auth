/* eslint-disable @typescript-eslint/no-unsafe-call */
import { MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(1)
  firstName: string;

  @MinLength(1)
  lastName: string;

  @MinLength(1)
  email: string;

  @MinLength(1)
  password: string;

  otp: string;
}
