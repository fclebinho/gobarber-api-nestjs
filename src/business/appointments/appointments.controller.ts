import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { IAppointmentsService } from './appointments.service';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { FindScheduleDto } from './dto/find-schedule.dto';
import { FindAvailabilityDto } from './dto/find-availability-dto';
import { SupabaseGuard } from 'src/common/supabase';
import { CreateAppointmentInput } from './inputs/create-appointment.input';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly service: IAppointmentsService) {}

  @UseGuards(SupabaseGuard)
  @Post()
  create(@Request() req, @Body() value: CreateAppointmentInput) {
    const { user } = req;
    return this.service.create({ ...value, userSub: user.sub });
  }

  @UseGuards(SupabaseGuard)
  @Get('/schedule')
  async findSchedule(@Body() value: FindScheduleDto) {
    return this.service.findSchedule(value);
  }

  @UseGuards(SupabaseGuard)
  @Get('/availability')
  findAvailability(@Body() value: FindAvailabilityDto) {
    return this.service.findAvailability(value);
  }

  @UseGuards(SupabaseGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(SupabaseGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @UseGuards(SupabaseGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() value: UpdateAppointmentDto) {
    return this.service.update(id, value);
  }

  @UseGuards(SupabaseGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
