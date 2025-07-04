import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v2 as cloudinary } from 'cloudinary';
import { uploadImage } from 'src/common/multer/cloud.result';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createEventDto: CreateEventDto, file: Express.Multer.File) {
    const { title, type, date, showTime, ...optionalFields } = createEventDto;

    // 1. Validate đầu vào
    if (!title || !type || !date || showTime === undefined || showTime <= 0) {
      throw new BadRequestException(
        'Thiếu hoặc sai định dạng trường: title, type, date, showTime',
      );
    }

    if (!file) throw new BadRequestException('No file uploaded');
    const result = await uploadImage(file.buffer);

    // 2. Bỏ qua các field không hợp lệ (undefined)
    const filteredOptionalFields = Object.fromEntries(
      Object.entries(optionalFields).filter(
        ([_, value]) => value !== undefined,
      ),
    );

    // 3. Tạo sự kiện
    const newEvent = await this.prismaService.event.create({
      data: {
        title,
        type,
        date: new Date(date),
        image: result.secure_url,
        showTime,
        ...filteredOptionalFields,
      },
    });

    if (!newEvent) {
      throw new BadRequestException('Tạo sự kiện thất bại');
    }

    // 4. Trả kết quả
    return {
      id: newEvent.id,
      title: newEvent.title,
      type: newEvent.type,
      date: newEvent.date,
      showTime: newEvent.showTime,
      location: newEvent.location,
      price: newEvent.price,
      image: newEvent.image,
      seats: newEvent.seats,
    };
  }

  async findAll() {
    const events = await this.prismaService.event.findMany({
      where: {
        isDeleted: 0,
      },
    });

    if (!events) throw new BadRequestException('Find all event fail');

    const data = events.map((event) => ({
      id: event.id,
      title: event.title,
      type: event.type,
      date: event.date,
      location: event.location,
      price: event.price,
      image: event.image,
      seats: event.seats,
    }));

    return data;
  }

  async findOne(id: number) {
    const event = await this.prismaService.event.findUnique({
      where: { id: id, isDeleted: 0 },
    });

    if (!event) throw new BadRequestException('Find event fail');

    const data = {
      id: event.id,
      title: event.title,
      type: event.type,
      date: event.date,
      location: event.location,
      price: event.price,
      image: event.image,
      seats: event.seats,
    };

    return data;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const existingEvent = await this.prismaService.event.findUnique({
      where: { id: id, isDeleted: 0 },
    });

    if (!existingEvent) throw new BadRequestException('Update event fail');

    const updateEvent = await this.prismaService.event.update({
      where: { id: id },
      data: {
        ...updateEventDto,
        date: updateEventDto.date ? new Date(updateEventDto.date) : undefined,
        updatedAt: new Date(),
      },
    });

    if (!updateEvent) throw new BadRequestException('Update event fail');

    const data = {
      id: updateEvent.id,
      title: updateEvent.title,
      type: updateEvent.type,
      date: updateEvent.date,
      location: updateEvent.location,
      price: updateEvent.price,
      image: updateEvent.image,
      seats: updateEvent.seats,
    };

    return data;
  }

  async remove(id: number) {
    const existingEvent = await this.prismaService.event.findUnique({
      where: { id: id, isDeleted: 0 },
    });

    if (!existingEvent) throw new BadRequestException('Event not found');

    const removeEvent = await this.prismaService.event.update({
      where: { id: id },
      data: { isDeleted: 1 },
    });

    if (!removeEvent) throw new BadRequestException('Remove event fail');

    const data = {
      id: removeEvent.id,
      title: removeEvent.title,
      type: removeEvent.type,
      date: removeEvent.date,
      location: removeEvent.location,
      price: removeEvent.price,
      image: removeEvent.image,
      seats: removeEvent.seats,
    };

    return data;
  }
}
