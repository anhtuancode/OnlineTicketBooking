import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  IsIn,
  IsDateString,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @ApiPropertyOptional({
    example: 'Avengers: Endgame',
    description: 'Tên sự kiện hoặc phim',
  })
  @IsString({ message: 'Title phải là chuỗi' })
  title: string;

  @ApiPropertyOptional({ example: 'movie', enum: ['movie', 'event'] })
  @IsIn(['movie', 'event'], { message: 'type phải là "movie" hoặc "event"' })
  type: string;

  @ApiPropertyOptional({
    example: '2025-07-10T19:30:00Z',
    description: 'Thời gian diễn ra sự kiện (ngày)',
  })
  @IsDateString({}, { message: 'Date phải là định dạng ISO (yyyy-MM-ddTHH:mm:ssZ)' })
  date: string;

  @ApiPropertyOptional({
    example: '19:30',
    description: 'Thời gian bắt đầu (định dạng HH:mm)',
  })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'startTime phải có định dạng HH:mm',
  })
  startTime: string;

  @ApiPropertyOptional({
    example: 'CGV Vincom Thủ Đức',
    description: 'Địa điểm tổ chức sự kiện',
  })
  @IsString({ message: 'Location phải là chuỗi' })
  location: string;

  @ApiPropertyOptional({
    example: 95000,
    description: 'Giá vé cho 1 người',
  })
  @IsNumber({}, { message: 'Price phải là số' })
  @Type(() => Number)
  @Min(0, { message: 'Price phải lớn hơn hoặc bằng 0' })
  price: number;

  @ApiPropertyOptional({
    example: 120,
    description: 'Tổng số chỗ/vé',
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'Seats phải là số' })
  @Min(1, { message: 'Seats phải lớn hơn 0' })
  seats: number;

  @ApiPropertyOptional({
    example: 120,
    description: 'Thời lượng chiếu phim (phút)',
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'showTime phải là số' })
  @Min(1, { message: 'showTime phải lớn hơn 0' })
  showTime: number;
}
