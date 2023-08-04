
export enum userRole {
  USER = 'user',
  ADMIN = 'admin',
}

export class CreateUserDto {
  id?: string;
  name: string;
  lastname: string;
  username: string;
  password: string;
  img?: string | string[];
  email: string;
  address?: string;
  tel?: string;
  rol?: userRole;
  isActive: boolean;
}
