import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { JwtService } from './services/jwt.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET') || 'default-secret-key',
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRATION') || '7d',
          },
        } as any;
      },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, JwtService, JwtStrategy],
  exports: [JwtService, UserService],
})
export class UserModule {}
