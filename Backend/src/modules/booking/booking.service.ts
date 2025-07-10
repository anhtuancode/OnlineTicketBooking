import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createBookingDto: CreateBookingDto, user: any) {
    const userId = Number(user.id);
    const {eventId, seats, totalPrice, status } = createBookingDto;

    if (!user) throw new BadRequestException('User not found');

    const event = await this.prismaService.event.findUnique({
      where: { id: eventId },
    });

    if (!event) throw new BadRequestException('Event not found');

    const booking = await this.prismaService.booking.create({
      data: {
        eventId,
        userId,
        seats,
        totalPrice,
        status,
      },
    });

    if (!booking) throw new BadRequestException('Create booking fail');

    const data = {
      id: booking.id,
      eventId: booking.eventId,
      userId: booking.userId,
      seats: booking.seats,
      totalPrice: booking.totalPrice,
      status: booking.status,
    };
    
    return data;
  }

  findAll() {
    return `This action returns all booking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
