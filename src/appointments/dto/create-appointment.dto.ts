import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsUUID()
  providerId: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
