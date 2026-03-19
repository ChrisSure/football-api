import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Source } from '../../core/db/entities/source.entity';
import { SourceController } from './controllers/source.controller';
import { SourceService } from './services/source.service';

@Module({
  imports: [TypeOrmModule.forFeature([Source])],
  controllers: [SourceController],
  providers: [SourceService],
  exports: [SourceService],
})
export class SourceModule {}
