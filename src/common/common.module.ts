import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SupabaseModule } from './supabase';

@Module({
  imports: [DatabaseModule, SupabaseModule],
})
export class CommonModule {}
