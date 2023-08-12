import { Module } from '@nestjs/common';
import {
  AppointmentsService,
  IAppointmentsService,
} from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [DatabaseModule, UsersModule, CommonModule],
  controllers: [AppointmentsController],
  providers: [
    {
      provide: IAppointmentsService,
      useClass: AppointmentsService,
    },
  ],
})
export class AppointmentsModule {}
