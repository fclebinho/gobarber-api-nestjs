import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { DatabaseService } from 'src/common/database/database.service';
import { startOfHour } from 'date-fns';

export abstract class IAppointmentsService {
  abstract create(value: CreateAppointmentDto);
  abstract findAll();
  abstract findOne(id: string);
  abstract update(id: string, value: UpdateAppointmentDto);
  abstract remove(id: string);
}

@Injectable()
export class AppointmentsService implements IAppointmentsService {
  constructor(private service: DatabaseService) {}

  async create(value: CreateAppointmentDto) {
    const date = startOfHour(new Date(value.date));
    const hasSameDate = await this.service.appointments.findFirst({
      where: { date },
    });

    if (hasSameDate) {
      throw new HttpException(
        'This appointment is already booked',
        HttpStatus.BAD_REQUEST,
      );
    }

    const appointment = await this.service.appointments.create({
      data: { provider: value.provider, date },
    });

    return appointment;
  }

  async findAll() {
    const appointment = await this.service.appointments.findMany();

    return appointment;
  }

  async findOne(id: string) {
    const appointment = await this.service.appointments.findFirst({
      where: { id },
    });

    return appointment;
  }

  async update(id: string, value: UpdateAppointmentDto) {
    const appointment = await this.service.appointments.update({
      where: { id },
      data: { provider: value.provider, date: value.date },
    });

    return appointment;
  }

  async remove(id: string) {
    const appointment = await this.service.appointments.delete({
      where: { id },
    });

    return appointment;
  }
}
