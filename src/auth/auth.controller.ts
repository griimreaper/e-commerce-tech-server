import { Body, Controller, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-users.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/file/multer.config';
import { FileService } from 'src/file/file.service';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly fileService: FileService,
        private readonly userService: UsersService,
        ) {}

    @Post('register')
    @UseInterceptors(FileInterceptor('img', multerConfig))
    async register(
        @Body() body: CreateUserDto,
        @UploadedFile() img?: any,
    ) {
        if (img) {
            const url = await this.fileService.createFiles(img);
            body = { ...body, img:url };
        }
        return await this.userService.createUser(body)
    }

    @Post('login')
    async loginAc(
        @Body() loginDto: LoginDto,
        @Res() res: Response,
        ) {
        const user = await this.authService.validate(loginDto)
        const token: any = await this.authService.login(user)

        res.status(200).setHeader('Authorization', `${token?.token}`).json({ ...token, id: user.id });
    }
}
