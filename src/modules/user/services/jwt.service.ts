import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  public generateToken(name: string, userId: number): string {
    const payload = {
      username: name,
      userId: userId,
      iat: Math.floor(Date.now() / 1000),
    };
    return this.jwtService.sign(payload);
  }
}
