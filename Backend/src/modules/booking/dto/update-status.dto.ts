import { IsNotEmpty, IsString, IsNumber,  IsEnum} from 'class-validator';

export enum BookingStatus {
  CONFIRMED = 'Confirmed',
  CANCELLED = 'Cancelled',
  PENDING = 'Pending',
}

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsEnum(BookingStatus)
  status: BookingStatus;
}
