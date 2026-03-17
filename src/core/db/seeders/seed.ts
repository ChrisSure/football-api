import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseSeeder } from './database.seeder';
import { User } from '../../../modules/user/entities/user.entity';
import { Project } from '../../../modules/project/entities/project.entity';
import { Source } from '../entities/source.entity';
import { Consumer } from '../entities/consumer.entity';
import { Article } from '../entities/article.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'xfootball',
      entities: [User, Project, Source, Consumer, Article],
      synchronize: false,
      logging: process.env.DB_LOGGING === 'true',
      charset: 'utf8mb4',
    }),
    TypeOrmModule.forFeature([User, Project, Source, Consumer, Article]),
  ],
  providers: [DatabaseSeeder],
})
class SeederModule {}

async function bootstrap() {
  try {
    console.log('Initializing seeder application...');
    const app = await NestFactory.createApplicationContext(SeederModule);

    const seeder = app.get(DatabaseSeeder);
    await seeder.seed();

    await app.close();
    console.log('Seeding completed, application closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

void bootstrap();
