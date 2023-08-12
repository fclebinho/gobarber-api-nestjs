import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  Param,
  Request,
  UseGuards,
  // Delete,
} from '@nestjs/common';
import { IProvidersService } from './providers.service';
import { SupabaseGuard } from 'src/common/supabase';
// import { CreateProviderDto } from './dto/create-provider.dto';
// import { UpdateProviderDto } from './dto/update-provider.dto';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: IProvidersService) {}

  // @Post()
  // create(@Body() createProviderDto: CreateProviderDto) {
  //   return this.providersService.create(createProviderDto);
  // }

  @Get()
  @UseGuards(SupabaseGuard)
  findAll(@Request() req) {
    const { user } = req;
    return this.providersService.findAll({ userLoggedSub: user.sub });
  }

  @Get(':id')
  @UseGuards(SupabaseGuard)
  findOne(@Request() req, @Param('id') id: string) {
    const { user } = req;
    return this.providersService.findOne({ userLoggedSub: user.sub, id });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
  //   return this.providersService.update(+id, updateProviderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.providersService.remove(+id);
  // }
}
