import { Module } from '@nestjs/common';
import {
  AppointmentsService,
  IAppointmentsService,
} from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppointmentsController],
  providers: [
    {
      provide: IAppointmentsService,
      useClass: AppointmentsService,
    },
  ],
})
export class AppointmentsModule {}
