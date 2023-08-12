import { IsNotEmpty } from 'class-validator';

export class FindScheduleDto {
  @IsNotEmpty()
  providerId: string;

  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  month: number;
}
