import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDTO } from './dto/signin.dto';
import { SignupDTO } from './dto/signup.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDTO: SignupDTO) {
    return await this.authService.signup(signupDTO);
  }

  @Post('signin')
  async signin(@Body() signinDTO: SigninDTO) {
    return await this.authService.signin(signinDTO);
  }

  @Post('forgot-password')
  async fotgotPassword(@Body() forgotPasswordDTO: ForgotPasswordDTO) {
    return await this.authService.forgotPassword(forgotPasswordDTO);
  }
}
