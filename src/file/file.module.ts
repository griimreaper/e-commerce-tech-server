import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { imgProviders } from './img.provider';

@Module({
  controllers: [FileController],
  providers: [FileService, ...imgProviders]
})
export class FileModule {}
