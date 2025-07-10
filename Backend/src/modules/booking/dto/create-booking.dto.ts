import { IsNotEmpty, IsString, IsNumber, IsArray, IsBoolean, IsEnum} from 'class-validator';

export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export class CreateBookingDto {
  @IsNotEmpty()
  @IsNumber()
  eventId: number;

  @IsNotEmpty()
  @IsNumber()
  seats: number; 

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsNotEmpty()
  @IsEnum(BookingStatus)
  status: BookingStatus;
}
