import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  provider: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
