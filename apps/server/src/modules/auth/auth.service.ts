import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  async login(dto: LoginDto) {
    // TODO: Replace with Prisma user lookup + password hashing verification.
    if (dto.email !== 'admin@demo.com' || dto.password !== 'Admin123!') {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: 'demo-user',
      email: dto.email,
      role: 'SUPER_ADMIN'
    };

    const accessToken = this.jwt.sign(payload);
    const refreshToken = this.jwt.sign(payload, { expiresIn: process.env.JWT_REFRESH_TTL ?? '30d' });

    return {
      accessToken,
      refreshToken,
      user: {
        id: 'demo-user',
        email: dto.email,
        role: 'SUPER_ADMIN'
      }
    };
  }
}


