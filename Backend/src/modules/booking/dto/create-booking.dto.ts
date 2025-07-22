import { IsNotEmpty, IsString, IsNumber, IsArray, IsBoolean, IsEnum} from 'class-validator';

export enum BookingStatus {
  CONFIRMED = 'Confirmed',
  CANCELLED = 'Cancelled',
  PENDING = 'Pending',
}

export class CreateBookingDto {
  @IsNotEmpty()
  @IsNumber()
  eventId: number;

  @IsNotEmpty()
  @IsString()
  seats: string; 

  @IsNotEmpty()
  @IsEnum(BookingStatus)
  status: BookingStatus;
}
