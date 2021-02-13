import { Controller, Post, UseGuards, Request, Logger, Get, Body } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JWtAuthGuard } from 'src/guards/jwt-auth.guard ';
import { AuthUser } from './decorators/user.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() body) {
    Logger.log(body);
    return {success: true}
  }

  @UseGuards(LocalAuthGuard)
  @Post('login/')
  async login(@Request() req) {
    Logger.log('before Login')
    return this.authService.login(req.user);
  }
  
  @UseGuards(JWtAuthGuard)
  @Get('/greet')
  async loggedIn(@AuthUser() user: any) {
    try {
      Logger.log('============================');
      Logger.log(user)
      return user;
    } catch(e) {
      Logger.log(e);
      return false;
    }
  }
}