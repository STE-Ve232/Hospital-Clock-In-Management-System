import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  async login(dto: LoginDto) {
    // TODO: Replace with Prisma user lookup.
    const hashedPassword = await bcrypt.hash('Admin123!', 10);

    const isPasswordMatching = await bcrypt.compare(
      dto.password,
      hashedPassword,
    );

    if (dto.email !== 'admin@demo.com' || !isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: 'demo-user',
      email: dto.email,
      role: 'SUPER_ADMIN'
    };

    const accessToken = this.jwt.sign(payload);
    const refreshToken = this.jwt.sign(payload, { expiresIn: '30d' });

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
