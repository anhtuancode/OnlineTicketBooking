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
    const { title, type, date, showTime, startTime, location, price, seats } =
      createEventDto;

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const priceEvent = Number(price);
    const seatsEvent = Number(seats);

    const result = await uploadImage(file.buffer);

    // 2. Gộp startTime (giờ + date) thành full datetime
    const parsedStartTime = (() => {
      const isoDate = new Date(date); // date: '2025-07-10'
      const [hourStr, minuteStr] = startTime.split(':');
      isoDate.setHours(Number(hourStr), Number(minuteStr), 0);
      // Cộng thêm 7 tiếng nếu server/database lưu UTC
      isoDate.setHours(isoDate.getHours() + 7);
      return isoDate;
    })();

    const newEvent = await this.prismaService.event.create({
      data: {
        title,
        type,
        date: new Date(date),
        startTime: parsedStartTime,
        showTime,
        location,
        price: priceEvent,
        seats: seatsEvent,
        image: result.secure_url,
      },
    });

    if (!newEvent) {
      throw new BadRequestException('Tạo sự kiện thất bại');
    }

    // 4. Trả về kết quả
    return {
      id: newEvent.id,
      title: newEvent.title,
      type: newEvent.type,
      date: newEvent.date,
      startTime: newEvent.startTime,
      showTime: newEvent.showTime,
      location: newEvent.location,
      price: newEvent.price,
      seats: newEvent.seats,
      image: newEvent.image,
    };
  }

  async count() {
    const count = await this.prismaService.event.count({
      where: {
        isDeleted: 0,
      },
    });

    return count;
  }

  async search(
    title: string,
    price?: number,
    location?: string,
    date?: string,
  ) {
    title = title || '';

    const where: any = { title: { contains: title }, isDeleted: 0 };

    if (price !== undefined) {
      if (price < 100000) {
        where.price = { lt: 100000 };
      } else if (price >= 100000 && price <= 300000) {
        where.price = {
          gte: 100000,
          lte: 300000,
        };
      } else if (price > 300000) {
        where.price = { gt: 300000 };
      }
    }

    if (date) {
      const startDate = new Date(date); // YYYY-MM-DDT00:00:00
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1); // ngày kế tiếp

      where.date = {
        gte: startDate,
        lt: endDate,
      };
    }

    if (location) {
      where.location = {
        contains: location.toLowerCase(), 
      };
    }

    const result = await this.prismaService.event.findMany({
      where: where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!result || result.length === 0) {
      throw new BadRequestException('No matching events found');
    }
    return {
      items: result || [],
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
      showTime: event.showTime,
      startTime: event.startTime
        ? event.startTime.toISOString().substr(11, 5) // "08:00"
        : '',
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
      showTime: event.showTime,
      startTime: event.startTime
        ? event.startTime.toISOString().substr(11, 5) // "08:00"
        : '',
    };

    return data;
  }

  async findMovies() {
    const events = await this.prismaService.event.findMany({
      where: {
        type: 'movie',
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
      showTime: event.showTime,
      startTime: event.startTime
        ? event.startTime.toISOString().substr(11, 5) // "08:00"
        : '',
    }));

    return data;
  }

  async findEvents() {
    const events = await this.prismaService.event.findMany({
      where: {
        type: 'event',
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
      showTime: event.showTime,
      startTime: event.startTime
        ? event.startTime.toISOString().substr(11, 5) // "08:00"
        : '',
    }));

    return data;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const existingEvent = await this.prismaService.event.findUnique({
      where: { id: id, isDeleted: 0 },
    });

    if (!existingEvent) throw new BadRequestException('Event not found');

    // Handle startTime parsing if provided
    let parsedStartTime: Date | undefined = undefined;
    if (updateEventDto.startTime && updateEventDto.date) {
      const isoDate = new Date(updateEventDto.date);
      const [hourStr, minuteStr] = updateEventDto.startTime.split(':');
      isoDate.setHours(Number(hourStr), Number(minuteStr), 0);
      // Cộng thêm 7 tiếng nếu server/database lưu UTC
      isoDate.setHours(isoDate.getHours() + 7);
      parsedStartTime = isoDate;
    }

    const updateEvent = await this.prismaService.event.update({
      where: { id: id },
      data: {
        ...updateEventDto,
        date: updateEventDto.date ? new Date(updateEventDto.date) : undefined,
        startTime: parsedStartTime,
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
      showTime: updateEvent.showTime,
      startTime: updateEvent.startTime
        ? updateEvent.startTime.toISOString().substr(11, 5) // "08:00"
        : '',
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

  async countEvent() {
    const count = await this.prismaService.event.count({
      where: {
        isDeleted: 0,
      },
    });

    return count;
  }
}
