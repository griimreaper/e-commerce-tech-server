/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { FileModule } from './file/file.module';
import { MulterModule } from '@nestjs/platform-express'
import { multerConfig } from './file/multer.config';
import { BuysModule } from './buys/buys.module';
import { CorsMiddleware } from './constants/cors.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MulterModule.register(multerConfig),
    DatabaseModule,
    UsersModule,
    ProductsModule,
    FileModule,
    BuysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }

}
