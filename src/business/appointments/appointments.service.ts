import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { DatabaseService } from 'src/common/database/database.service';
import {
  getDate,
  getDaysInMonth,
  getHours,
  isAfter,
  isBefore,
  startOfHour,
} from 'date-fns';
import { FindScheduleDto } from './dto/find-schedule.dto';
import { DayAvailability } from './entities/day-avalilability';
import { FindAvailabilityDto } from './dto/find-availability-dto';
import { Appointment } from './entities/appointment';
import { IUsersService } from 'src/common/users/users.service';
import {
  toEndHourDay,
  toFirstDayMonth,
  toLastDayMonth,
  toStartHourDay,
} from 'src/utils';
import { HourAvailability } from './entities/hour-avalilability';
import { IProvidersService } from '../providers/providers.service';

export abstract class IAppointmentsService {
  abstract create(value: CreateAppointmentDto): Promise<Appointment>;
  abstract findAll(): Promise<Appointment[]>;
  abstract findSchedule(value: FindScheduleDto): Promise<DayAvailability[]>;
  abstract findAvailability(
    value: FindScheduleDto,
  ): Promise<HourAvailability[]>;
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
    private providerService: IProvidersService,
  ) {
    this.db.$on('query', (e) => {
      console.log('Params: ' + e.params);
      console.log('Query: ' + e.query);
      console.log('Duration: ' + e.duration + 'ms');
    });
  }

  async findAvailability({
    providerId,
    year,
    month,
    day,
  }: FindAvailabilityDto): Promise<HourAvailability[]> {
    const firstDay = toStartHourDay(year, month, day);
    const lastDay = toEndHourDay(year, month, day);

    const provider = await this.providerService.findOne({ id: providerId });
    console.log('findAvailability', provider);

    if (!provider) {
      throw new HttpException('Provider not found', HttpStatus.BAD_REQUEST);
    }

    const appointaments = await this.db.appointment.findMany({
      where: {
        providerId: providerId,
        date: { gte: firstDay, lte: lastDay },
      },
    });

    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const availability = eachHourArray.map((hour) => {
      const available = !appointaments.find(
        ({ date }) => getHours(date) === hour,
      );

      const currentDate = new Date(Date.now());
      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: available && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }

  async findSchedule({
    year,
    month,
    providerId,
  }: FindScheduleDto): Promise<DayAvailability[]> {
    const firstDay = toFirstDayMonth(year, month);
    const lastDay = toLastDayMonth(year, month);

    const provider = await this.providerService.findOne({ id: providerId });

    if (!provider) {
      throw new HttpException('Provider not found', HttpStatus.BAD_REQUEST);
    }

    const appointaments = await this.db.appointment.findMany({
      where: { providerId, date: { gte: firstDay, lte: lastDay } },
    });

    const daysInMonth = getDaysInMonth(new Date(year, month - 1));
    const eachDayMonth = Array.from(
      { length: daysInMonth },
      (value, index) => index + 1,
    );

    const availability = eachDayMonth.map((day) => {
      const appointamentsInDay = appointaments.filter(
        ({ date }) => getDate(date) === day,
      );

      const currentDate = new Date(Date.now());
      const compareDate = new Date(year, month - 1, day + 1);

      return {
        day,
        available:
          appointamentsInDay.length < 10 && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }

  async create({
    providerId,
    userSub,
    date: selectedDate,
  }: CreateAppointmentDto): Promise<Appointment> {
    const date = startOfHour(new Date(selectedDate));

    if (getHours(date) < 8 && getHours(date) > 17) {
      throw new HttpException(
        'You can only create appointment between 8am and 5pm',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (isBefore(date, Date.now())) {
      throw new HttpException(
        "You can't create an appointment on a past date",
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.findBySub(userSub);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    if (providerId === user.id) {
      throw new HttpException(
        "You can't create an appointment for yourself",
        HttpStatus.BAD_REQUEST,
      );
    }

    const provider = await this.providerService.findOne({ id: providerId });

    if (!provider) {
      throw new HttpException('Provider not found', HttpStatus.BAD_REQUEST);
    }

    const isAlready = await this.db.appointment.findFirst({
      where: { date: date },
    });

    if (isAlready) {
      throw new HttpException(
        'This hour is already booked',
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
