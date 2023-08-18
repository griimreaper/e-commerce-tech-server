import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-users.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
    ) { }

    async validate(body: LoginDto) {
        const user = await this.userService.findOne(body.email)

        if (!user) throw new HttpException('EMAIL INCORRECT', 403);
        if (user && (await compare(body.password, user.password))) {
            return { ...user.dataValues}
        } else throw new HttpException('PASSWORD INCORRECT', 403);
    }

    async login(
        user: CreateUserDto
    ) {
        try {
            const {id, rol, email, password, ...toPayload} = user
            const payload = {
                ...toPayload,
                email: email,
                sub: id,
                rol: rol,
            }
            const token = this.jwtService.sign(payload)
            
            return { token }
        } catch (error) {

            return { message: error.message, status: error.status }
        }
    }
}
