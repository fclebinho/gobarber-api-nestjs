import { Module } from '@nestjs/common';
import {
  AppointmentsService,
  IAppointmentsService,
} from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { ProvidersController } from './providers.controller';
import { IProvidersService, ProvidersService } from './providers.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [AppointmentsController, ProvidersController],
  providers: [
    {
      provide: IAppointmentsService,
      useClass: AppointmentsService,
    },
    {
      provide: IProvidersService,
      useClass: ProvidersService,
    },
  ],
})
export class AppointmentsModule {}
