import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { DatabaseService } from 'src/common/database/database.service';
import { startOfHour } from 'date-fns';
import { Appointment } from '@prisma/client';

export abstract class IAppointmentsService {
  abstract create(value: CreateAppointmentDto): Promise<Appointment>;
  abstract findAll(): Promise<Appointment[]>;
  abstract findOne(id: string): Promise<Appointment | null>;
  abstract update(
    id: string,
    value: UpdateAppointmentDto,
  ): Promise<Appointment>;
  abstract remove(id: string): Promise<Appointment>;
}

@Injectable()
export class AppointmentsService implements IAppointmentsService {
  constructor(private service: DatabaseService) {}

  async create(value: CreateAppointmentDto): Promise<Appointment> {
    const date = startOfHour(new Date(value.date));

    const userExists = await this.service.user.findFirst({
      where: { id: value.providerId },
    });

    if (!userExists) {
      throw new HttpException(
        'This provider not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isAlready = await this.service.appointment.findFirst({
      where: { date },
    });

    if (isAlready) {
      throw new HttpException(
        'This appointment is already booked',
        HttpStatus.BAD_REQUEST,
      );
    }

    const appointment = await this.service.appointment.create({
      data: { providerId: value.providerId, date },
    });

    return appointment;
  }

  async findAll(): Promise<Appointment[]> {
    const appointments = await this.service.appointment.findMany();

    return appointments;
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
      data: { providerId: value.providerId, date: value.date },
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
