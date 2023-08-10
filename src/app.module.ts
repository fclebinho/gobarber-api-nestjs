import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { SupabaseGuard, SupabaseModule } from './common/supabase';
import { PrismaService } from './database/prisma.service';
import {
  AppointmentService,
  IAppointmentService,
} from './services/appointment.service';
import { AppointmentController } from './controllers/appointment.controller';

@Module({
  imports: [ConfigModule.forRoot(), PassportModule, SupabaseModule],
  controllers: [AppointmentController],
  providers: [
    PrismaService,

    {
      provide: APP_GUARD,
      useClass: SupabaseGuard,
    },
    {
      provide: IAppointmentService,
      useClass: AppointmentService,
    },
  ],
})
export class AppModule {}
