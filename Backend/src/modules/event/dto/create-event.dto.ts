import { IsString, IsNumber, IsDateString, IsUrl, IsIn, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ example: 'Avengers: Endgame', description: 'Tên sự kiện hoặc phim' })
  @IsString({ message: 'Title phải là chuỗi' })
  title: string;

  @ApiProperty({ example: 'movie', enum: ['movie', 'event'] })
  @IsIn(['movie', 'event'], { message: 'type phải là "movie" hoặc "event"' })
  type: string;

  @ApiProperty({ example: '2025-07-10T19:30:00Z', description: 'Thời gian diễn ra sự kiện (ISO format)' })
  @IsDateString({}, { message: 'Date phải là chuỗi định dạng ISO (yyyy-MM-ddTHH:mm:ssZ)' })
  date: string;

  @ApiProperty({ example: 'CGV Vincom Thủ Đức', description: 'Địa điểm tổ chức sự kiện' })
  @IsString({ message: 'Location phải là chuỗi' })
  location: string;

  @ApiProperty({ example: 95000, description: 'Giá vé cho 1 người' })
  @IsNumber({}, { message: 'Price phải là số' })
  @Min(0, { message: 'Price phải lớn hơn hoặc bằng 0' })
  price: number;

  @ApiProperty({ example: 'https://example.com/poster.jpg', description: 'URL ảnh poster/banner' })
  @IsUrl({}, { message: 'Image phải là đường dẫn hợp lệ (URL)' })
  image: string;

  @ApiProperty({ example: 120, description: 'Tổng số chỗ/vé' })
  @IsNumber({}, { message: 'Seats phải là số' })
  @Min(1, { message: 'Seats phải lớn hơn 0' })
  seats: number;
}
