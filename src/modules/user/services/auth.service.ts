import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from './jwt.service';
import { LoginResponse } from '../interfaces/login-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  public async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.validateUser(loginDto.name, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.generateToken(user.name);
    return { access_token: token };
  }

  private async validateUser(
    name: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.name = :name', { name })
      .getOne();

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  private async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
