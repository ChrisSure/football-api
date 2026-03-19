import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { SourceModule } from './modules/source/source.module';
import { ConsumerModule } from './modules/consumer/consumer.module';
import { ArticleModule } from './modules/article/article.module';

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
      entities: [
        __dirname + '/core/db/entities/**/*.entity{.ts,.js}',
        __dirname + '/modules/**/entities/**/*.entity{.ts,.js}',
      ],
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      logging: process.env.DB_LOGGING === 'true',
      charset: 'utf8mb4',
    }),
    UserModule,
    ProjectModule,
    SourceModule,
    ConsumerModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
