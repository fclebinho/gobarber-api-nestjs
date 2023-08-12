import { Injectable } from '@nestjs/common';
import { Supabase } from 'src/common/supabase';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import { IUsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private supabase: Supabase,
    private userService: IUsersService,
  ) {}

  async signUp(value: SignUpWithPasswordCredentials) {
    const response = await this.supabase.getClient().auth.signUp(value);

    const { user } = response.data;
    if (user) {
      this.userService.create({ email: user.email, sub: user.id });
    }

    return response;
  }

  async signInWithPassword(value: SignInWithPasswordCredentials) {
    const response = await this.supabase
      .getClient()
      .auth.signInWithPassword(value);

    const { user } = response.data;
    if (user) {
      this.userService.create({ email: user.email, sub: user.id });
    }

    return response;
  }
}
