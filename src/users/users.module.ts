import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { usersProviders } from './users.provider';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}
