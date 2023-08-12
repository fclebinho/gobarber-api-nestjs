import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAppointmentInput {
  @IsNotEmpty()
  @IsUUID()
  providerId: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
