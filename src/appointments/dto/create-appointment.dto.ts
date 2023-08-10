import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsUUID()
  provider: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
