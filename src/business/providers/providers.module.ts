import { Module } from '@nestjs/common';
import { IProvidersService, ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [DatabaseModule, CommonModule],
  controllers: [ProvidersController],
  providers: [
    {
      provide: IProvidersService,
      useClass: ProvidersService,
    },
  ],
  exports: [IProvidersService],
})
export class ProvidersModule {}
