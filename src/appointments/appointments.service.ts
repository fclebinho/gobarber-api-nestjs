import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { DatabaseService } from 'src/common/database/database.service';
import { startOfHour } from 'date-fns';
import { FindScheduleDto } from './dto/find-schedule.dto';
import { DayAvailability } from './entities/day-avalilability';
import { FindAvailabilityDto } from './dto/find-availability-dto';
import { Appointment } from './entities/appointment';
import { IUsersService } from 'src/users/users.service';

export abstract class IAppointmentsService {
  abstract create(value: CreateAppointmentDto): Promise<Appointment>;
  abstract findAll(): Promise<Appointment[]>;
  abstract findSchedule(value: FindScheduleDto): Promise<Appointment[]>;
  abstract findAvailability(value: FindScheduleDto): Promise<DayAvailability[]>;
  abstract findOne(id: string): Promise<Appointment | null>;
  abstract update(
    id: string,
    value: UpdateAppointmentDto,
  ): Promise<Appointment>;
  abstract remove(id: string): Promise<Appointment>;
}

@Injectable()
export class AppointmentsService implements IAppointmentsService {
  constructor(
    private db: DatabaseService,
    private userService: IUsersService,
  ) {
    // this.db.$on('query', (e) => {
    //   console.log('Params: ' + e.params);
    //   console.log('Query: ' + e.query);
    //   console.log('Duration: ' + e.duration + 'ms');
    // });
  }

  async findAvailability({
    year,
    month,
    day,
    providerId,
  }: FindAvailabilityDto): Promise<DayAvailability[]> {
    const firstDay = new Date(year, month - 1, day, 0);
    const lastDay = new Date(year, month, day, 0);

    const appointaments = await this.db.appointment.findMany({
      where: { providerId, date: { gte: firstDay, lte: lastDay } },
    });

    return appointaments.map(() => ({ hour: 3, available: false }));
  }

  async findSchedule({
    year,
    month,
    providerId,
  }: FindScheduleDto): Promise<Appointment[]> {
    const firstDay = new Date(year, month - 1, 1, 0);
    const lastDay = new Date(year, month, 0, 0);

    const appointaments = await this.db.appointment.findMany({
      where: { providerId, date: { gte: firstDay, lte: lastDay } },
    });

    appointaments.map((item) => console.log(item));

    return appointaments;
  }

  async create({
    providerId,
    userSub,
    date: selectedDate,
  }: CreateAppointmentDto): Promise<Appointment> {
    const date = startOfHour(new Date(selectedDate));

    const provider = await this.db.user.findFirst({
      where: { id: providerId, role: 'PROVIDER' },
    });

    if (!provider) {
      throw new HttpException('Provider not found', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.findBySub(userSub);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const isAlready = await this.db.appointment.findFirst({
      where: { date: date },
    });

    if (isAlready) {
      throw new HttpException(
        'This appointment is already booked',
        HttpStatus.BAD_REQUEST,
      );
    }

    const appointment = await this.db.appointment.create({
      data: { userId: user.id, providerId, date },
    });

    return appointment;
  }

  async findAll(): Promise<Appointment[]> {
    const appointments = await this.db.appointment.findMany();

    return appointments;
  }

  async findOne(id: string): Promise<Appointment | null> {
    const appointment = await this.db.appointment.findFirst({
      where: { id },
    });

    return appointment;
  }

  async update(id: string, value: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.db.appointment.update({
      where: { id },
      data: { providerId: value.providerId, date: value.date },
    });

    return appointment;
  }

  async remove(id: string): Promise<Appointment> {
    const appointment = await this.db.appointment.delete({
      where: { id },
    });

    return appointment;
  }
}
