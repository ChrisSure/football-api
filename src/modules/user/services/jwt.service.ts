import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { UserRole } from '../../../core/db/enums';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  public generateToken(name: string, userId: number, role: UserRole): string {
    const payload = {
      username: name,
      userId: userId,
      role: role,
      iat: Math.floor(Date.now() / 1000),
    };
    return this.jwtService.sign(payload);
  }
}
