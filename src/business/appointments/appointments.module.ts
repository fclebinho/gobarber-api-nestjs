import { Module } from '@nestjs/common';
import {
  AppointmentsService,
  IAppointmentsService,
} from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { CommonModule } from 'src/common/common.module';
import { ProvidersModule } from '../providers/providers.module';

@Module({
  imports: [DatabaseModule, ProvidersModule, CommonModule],
  controllers: [AppointmentsController],
  providers: [
    {
      provide: IAppointmentsService,
      useClass: AppointmentsService,
    },
  ],
})
export class AppointmentsModule {}
