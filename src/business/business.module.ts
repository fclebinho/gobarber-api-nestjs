import { Module } from '@nestjs/common';
import { AppointmentsModule } from './appointments/appointments.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [AppointmentsModule, ProvidersModule],
  exports: [AppointmentsModule, ProvidersModule],
})
export class BusinessModule {}
