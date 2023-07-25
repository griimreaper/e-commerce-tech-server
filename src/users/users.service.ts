import { Inject, Injectable, HttpException } from '@nestjs/common';
import { Users } from './users.entity';
@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private serviceUsers: typeof Users,
  ) {}

  async findAll(): Promise<Users[]> {
    try {
      const allUsers = await this.serviceUsers.findAll();

      return allUsers;
    } catch (error) {
      throw new HttpException('Error al intentar buscar los usuarios', 404);
    }
  }
}
