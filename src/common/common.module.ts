import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SupabaseModule } from './supabase';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, SupabaseModule, UsersModule, AuthModule],
  exports: [DatabaseModule, SupabaseModule, UsersModule, AuthModule],
})
export class CommonModule {}
