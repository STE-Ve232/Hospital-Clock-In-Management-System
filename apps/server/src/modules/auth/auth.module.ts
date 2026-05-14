import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthStrategy } from './strategies/local-auth.strategy';
import { RbacGuard } from './rbac/rbac.guard';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET ?? 'dev_access_secret',
      signOptions: { expiresIn: process.env.JWT_ACCESS_TTL ?? '15m' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStrategy, RbacGuard, Reflector]
})
export class AuthModule {}


