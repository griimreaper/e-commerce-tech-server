import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { FileService } from 'src/file/file.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt-strategy/jwt-strategy.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, FileService, JwtAuthGuard, JwtStrategy, UsersService]
})
export class AuthModule { }
