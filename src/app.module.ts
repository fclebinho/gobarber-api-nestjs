import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { CommonModule } from './common/common.module';
import { BusinessModule } from './business/business.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    CommonModule,
    BusinessModule,
  ],
})
export class AppModule {}
