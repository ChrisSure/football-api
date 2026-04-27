import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Source } from './entities/source.entity';
import { Project } from '../project/entities/project.entity';
import { SourceController } from './controllers/source.controller';
import { SourceService } from './services/source.service';

@Module({
  imports: [TypeOrmModule.forFeature([Source, Project])],
  controllers: [SourceController],
  providers: [SourceService],
  exports: [SourceService],
})
export class SourceModule {}
