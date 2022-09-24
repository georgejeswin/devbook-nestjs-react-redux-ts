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
