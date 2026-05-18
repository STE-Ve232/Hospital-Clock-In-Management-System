import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RbacGuard } from './rbac/rbac.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Post('logout')
  @UseGuards(RbacGuard)
  async logout() {
    return { ok: true };
  }

  @Post('refresh')
  @UseGuards(RbacGuard)
  async refresh() {
    return { ok: true };
  }

  // RBAC wiring test endpoint (will be removed once real RBAC is implemented)
  @Post('rbac-demo')
  @UseGuards(RbacGuard)
  async rbacDemo() {
    return { ok: true };
  }
}
