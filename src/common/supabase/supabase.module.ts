import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SupabaseStrategy } from './supabase.strategy';
import { SupabaseGuard } from './supabase.guard';
import { Supabase } from './supabase';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ConfigModule],
  providers: [
    Supabase,
    SupabaseStrategy,
    SupabaseGuard,
    {
      provide: APP_GUARD,
      useClass: SupabaseGuard,
    },
  ],
})
export class SupabaseModule {}
