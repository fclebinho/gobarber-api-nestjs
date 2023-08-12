import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { SupabaseModule } from '../supabase';

@Module({
  imports: [UsersModule, SupabaseModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
