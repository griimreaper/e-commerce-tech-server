import { Inject, Injectable, HttpException } from '@nestjs/common';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-users.dto';
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
      throw new HttpException('Error to try find users', 404);
    }
  }

  async createUser(body: CreateUserDto): Promise<Users> {
    try {
      const { email } = body;
      const [user, created] = await this.serviceUsers.findOrCreate({
        where: { email },
        defaults: { ...body },
      });
      if (!created) {
        throw new HttpException('El email ya esta en uso.', 400);
      } else return user;
    } catch (error) {
      throw error;
    }
  }
}
