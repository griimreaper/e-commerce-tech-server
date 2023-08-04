import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/create-users.dto';
import { multerConfig } from 'src/file/multer.config';
import { FileService } from 'src/file/file.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private readonly fileService: FileService,
    ) {}
  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('img', multerConfig))
  async createUser(
    @Body() body: CreateUserDto,
    @UploadedFile() img?: any,
  ) {
    if (img) {
      const url = await this.fileService.createFiles(img);
      body = { ...body, img:url };
    }
    return this.usersService.createUser(body);
  }

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('img', multerConfig))
  async updateUser(
    @Body() body: CreateUserDto,
    @Param('id') id: string,
    @UploadedFile() img?: any,
  ) {
    if (img) {
      const url = await this.fileService.createFiles(img);
      return this.usersService.updateUser(id, body, url)
    }
    return this.usersService.updateUser(id, body);
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id:string) {
    return this.usersService.deleteUser(id);
  }
}
