import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { usersProviders } from './users.provider';
import { UsersService } from './users.service';
import { FileService } from 'src/file/file.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders, FileService],
  exports: [UsersService, ...usersProviders],
})
export class UsersModule {}
