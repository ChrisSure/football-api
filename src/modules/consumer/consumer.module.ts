import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumer } from './entities/consumer.entity';
import { ConsumerController } from './controllers/consumer.controller';
import { ConsumerService } from './services/consumer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Consumer])],
  controllers: [ConsumerController],
  providers: [ConsumerService],
  exports: [ConsumerService],
})
export class ConsumerModule {}
