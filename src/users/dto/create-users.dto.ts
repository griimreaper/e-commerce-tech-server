/* eslint-disable prettier/prettier */
export class CreateUserDto {
  id: string;
  name: string;
  lastname: string;
  username: string;
  password: string;
  img?: string;
  email: string;
  address?: string;
  tel?: number;
  dni?: number;
  isAdmin: boolean;
  isActive: boolean;
}
