import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateAppointmentDto } from 'src/dto/update-appointment.dto';

export abstract class IAppointmentService {
  abstract create(value: CreateAppointmentDto);
  abstract findAll();
  abstract findOne(id: string);
  abstract update(id: string, value: UpdateAppointmentDto);
  abstract remove(id: string);
}

@Injectable()
export class AppointmentService implements IAppointmentService {
  constructor(private prisma: PrismaService) {}

  async create(value: CreateAppointmentDto) {
    const appointment = await this.prisma.appointments.create({
      data: { provider: value.provider, date: value.date },
    });

    return appointment;
  }

  async findAll() {
    const appointment = await this.prisma.appointments.findMany({});

    return appointment;
  }

  async findOne(id: string) {
    const appointment = await this.prisma.appointments.findFirst({
      where: { id },
    });

    return appointment;
  }

  async update(id: string, value: UpdateAppointmentDto) {
    const appointment = await this.prisma.appointments.update({
      where: { id },
      data: { provider: value.provider, date: value.date },
    });

    return appointment;
  }

  async remove(id: string) {
    const appointment = await this.prisma.appointments.delete({
      where: { id },
    });

    return appointment;
  }
}
