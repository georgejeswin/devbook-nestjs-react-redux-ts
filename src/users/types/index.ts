import { Exclude } from 'class-transformer';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  userType: UserType;
}

export enum UserType {
  USER = 'user',
  ADMIN = 'admin',
}

export class SerializedUser {
  id: string;

  email: string;

  username: string;

  userType: UserType;

  firstName: string;

  lastName: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
