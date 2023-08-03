/* eslint-disable prettier/prettier */
import { Inject, Injectable, HttpException } from '@nestjs/common';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private serviceUsers: typeof Users,
  ) {}

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

  async findAll(): Promise<Users[]> {
    try {
      const allUsers = await this.serviceUsers.findAll();
      return allUsers;
    } catch (error) {
      throw new HttpException('Error to try find users', 404);
    }
  }

  async findOne(id: number): Promise<Users> {
    try {
      const product = await this.serviceUsers.findByPk(id);
      if (!product) {
        throw new HttpException('User not found', 404);
      }
      return product;
    } catch (error) {
      throw new HttpException('Error finding the user', 404);
    }
  }

  async updateUser(userId: number, body: UpdateUserDto): Promise<Users> {
    try {
      const user = await this.serviceUsers.findByPk(userId);
      if (!user) {
        throw new HttpException('Usuario no encontrado.', 404);
      }
      await user.update({ ...body });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId: number): Promise<Users> {
    try {
      const user = await this.serviceUsers.findByPk(userId);
      if (!user) {
        throw new HttpException('Usuario no encontrado.', 404);
      }
      await user.destroy();
      return user;
    } catch (error) {
      throw error;
    }
  }
}
