import { Body, Controller, Get, Post } from '@nestjs/common';
import { IProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly service: IProvidersService) {}

  @Post()
  create(@Body() value: CreateProviderDto) {
    return this.service.create(value);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
