import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createEventDto: CreateEventDto) {
    const { title, type, date, location, price, image, seats } = createEventDto;

    const existingEvent = await this.prismaService.event.findFirst({
      where: {
        title,
        date,
        location,
      },
    });

    if (existingEvent) {
      throw new BadRequestException(
        'An event with the same title, date, and location already exists.',
      );
    };

    const newEvent = await this.prismaService.event.create({
      data: {
        title,
        type,
        date,
        location,
        price,
        image,
        seats,
      },
    })

    if (!newEvent) throw new BadRequestException('Create event fail');

    const data = {
      id: newEvent.id,
      title: newEvent.title,
      type: newEvent.type,
      date: newEvent.date,
      location: newEvent.location,
      price: newEvent.price,
      image: newEvent.image,
      seats: newEvent.seats,
    };

    return data;
  }

  async findAll() {
    const events = await this.prismaService.event.findMany({
      where: {
        isDeleted: 0
      }
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
      seats: event.seats
    }))

    return data;
  }

  async findOne(id: number) {
    const event = await this.prismaService.event.findUnique({ where: { id: id, isDeleted: 0} });

    if (!event) throw new BadRequestException('Find event fail');

    const data = {
      id: event.id,
      title: event.title,
      type: event.type,
      date: event.date,
      location: event.location,
      price: event.price,
      image: event.image,
      seats: event.seats
    }

    return data;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const existingEvent = await this.prismaService.event.findUnique({ where: { id: id, isDeleted: 0} });

    if (!existingEvent) throw new BadRequestException('Update event fail');

    const updateEvent = await this.prismaService.event.update({ where: { id: id }, data: {
      ...updateEventDto,
      date: updateEventDto.date ? new Date(updateEventDto.date): undefined,
      updatedAt: new Date()
    } });

    if (!updateEvent) throw new BadRequestException('Update event fail');

    const data = {
      id: updateEvent.id,
      title: updateEvent.title,
      type: updateEvent.type,
      date: updateEvent.date,
      location: updateEvent.location,
      price: updateEvent.price,
      image: updateEvent.image,
      seats: updateEvent.seats
    }

    return data;
  }

  async remove(id: number) {
    const existingEvent = await this.prismaService.event.findUnique({ where: { id: id, isDeleted: 0} });

    if (!existingEvent) throw new BadRequestException('Event not found');
    
    const removeEvent = await this.prismaService.event.update({ where: { id: id }, data: { isDeleted: 1 } });

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
    }

    return data;
  }
}
