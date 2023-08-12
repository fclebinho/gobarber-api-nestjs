import { IsNotEmpty } from 'class-validator';

export class FindAvailabilityDto {
  @IsNotEmpty()
  providerId: string;

  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  month: number;

  @IsNotEmpty()
  day: number;
}
