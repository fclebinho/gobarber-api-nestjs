import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { SupabaseGuard, SupabaseModule } from './common/supabase';
import { PrismaService } from './database/prisma.service';
import { MemberRepository } from './repositories/member-repository';
import { MemberRepositoryPrisma } from './prisma/member-repository-prisma';

@Module({
  imports: [ConfigModule.forRoot(), PassportModule, SupabaseModule],
  controllers: [AppController],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: SupabaseGuard,
    },
    {
      provide: MemberRepository,
      useClass: MemberRepositoryPrisma,
    },
  ],
})
export class AppModule {}
