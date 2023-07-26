import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, ResetPasswordDto } from './dto';
import { UpdateUserPrefsDto } from '../userprefs/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() authDto: AuthDto, @Body()  updateUserPrefsDto: UpdateUserPrefsDto) {
    return this.authService.signup(authDto, updateUserPrefsDto);
  }

  @Post('signin')
  signin(@Body() authDto: AuthDto) {
    return this.authService.signin(authDto);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPassDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPassDto);
  }
}
