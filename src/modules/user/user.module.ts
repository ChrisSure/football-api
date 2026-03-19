import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ms from 'ms';
import { User } from './entities/user.entity';
import { Project } from '../project/entities/project.entity';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { JwtService } from './services/jwt.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Project]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const expiration = (configService.get<string>('JWT_EXPIRATION') ||
          '7d') as ms.StringValue;
        const expirationMs = ms(expiration);
        const fallbackSeconds =
          parseInt(
            configService.get<string>('JWT_EXPIRATION_FALLBACK') ?? '604800',
            10,
          ) || 604800;
        return {
          secret:
            configService.get<string>('JWT_SECRET') || 'default-secret-key',
          signOptions: {
            expiresIn: expirationMs
              ? Math.floor(expirationMs / 1000)
              : fallbackSeconds,
          },
        };
      },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, JwtService, JwtStrategy],
  exports: [JwtService, UserService],
})
export class UserModule {}
