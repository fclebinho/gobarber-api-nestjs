import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { DatabaseService } from 'src/common/database/database.service';
import { startOfHour } from 'date-fns';
import { Appointment } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(private service: DatabaseService) {}

  async create(value: CreateAppointmentDto): Promise<Appointment> {
    const date = startOfHour(new Date(value.date));
    const hasSameDate = await this.service.appointment.findFirst({
      where: { date },
    });

    if (hasSameDate) {
      throw new HttpException(
        'This appointment is already booked',
        HttpStatus.BAD_REQUEST,
      );
    }

    const appointment = await this.service.appointment.create({
      data: { provider: value.provider, date },
    });

    return appointment;
  }

  async findAll(): Promise<Appointment[]> {
    const appointment = await this.service.appointment.findMany();

    return appointment;
  }

  async findOne(id: string): Promise<Appointment | null> {
    const appointment = await this.service.appointment.findFirst({
      where: { id },
    });

    return appointment;
  }

  async update(id: string, value: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.service.appointment.update({
      where: { id },
      data: { provider: value.provider, date: value.date },
    });

    return appointment;
  }

  async remove(id: string): Promise<Appointment> {
    const appointment = await this.service.appointment.delete({
      where: { id },
    });

    return appointment;
  }
}
