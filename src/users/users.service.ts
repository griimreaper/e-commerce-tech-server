/* eslint-disable prettier/prettier */
import { Inject, Injectable, HttpException } from '@nestjs/common';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-users.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private serviceUsers: typeof Users,
  ) {}

  async createUser(body: CreateUserDto): Promise<Users> {
    const { password } = body;
    const hashedPassword = await hash(password, 10);
    try {
      const { email } = body;
      const [user, created] = await this.serviceUsers.findOrCreate({
        where: { email },
        defaults: { ...body, password: hashedPassword, isActive: true, rol: 'user'},
      });
      if (!created) {
        throw new HttpException('This email has already in use.', 400);
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

  async updateUser(userId: string, body: CreateUserDto, img?: any): Promise<Users> {
    const { name, password, lastname, username, address } = body // se realiza un destructuring para editar solo el dato que se modifico
    try {
      const user = await this.serviceUsers.findByPk(userId);
      if (!user) {
        throw new HttpException('User not find.', 404);
      } else {
        if (name) user.name = name;
        if (lastname) user.lastname = lastname;
        if (password) {
          const hashedPassword = await hash(password, 10);
          user.password = hashedPassword;
        }
        if (username) user.username = username;
        if (address) user.address = address;
        if (img) user.img = img;
        await user.save();
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<string> {
    let resultado = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 10; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      resultado += caracteres.charAt(indice); // se genera un string aleatorio
    }

    try {
      const user = await this.serviceUsers.findByPk(userId);
      if (!user) {
        throw new HttpException('User not find.', 404);
      } else {
        user.isActive = false;
        user.email = `Deleted_${user.email}_${resultado}`; //  se cambia el valor de email para que el usuario pueda volver a registrarse
        await user.save();
        return 'User eliminated';
      }
    } catch (error) {
      throw error;
    }
  }
}
