import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() value: SignUpWithPasswordCredentials) {
    return this.authService.signUp(value);
  }

  @Post('sign-in')
  signIn(@Body() value: SignInWithPasswordCredentials) {
    return this.authService.signInWithPassword(value);
  }
}
