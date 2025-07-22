import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class BookingService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createBookingDto: CreateBookingDto, user: any) {
    const userId = Number(user.id);
    const { eventId, seats, status } = createBookingDto;

    if (!user) throw new BadRequestException('User not found');

    const event = await this.prismaService.event.findUnique({
      where: { id: eventId },
    });

    if (!event) throw new BadRequestException('Event not found');

    const ticketPrice = Number(event.price);
    const seatsArray = seats.split(',');
    const seatCount = seatsArray.length;
    const totalPrice = ticketPrice * seatCount;

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

  async findAll() {
    const bookings = await this.prismaService.booking.findMany({
      where: {
        isDeleted: 0,
      },
      include: {
        User_Booking_userIdToUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Event: {
          select: {
            id: true,
            title: true,
            startTime: true,
            location: true,
          },
        },
      },
    });

    if (!bookings) throw new BadRequestException('Find all booking fail');

    const data = bookings.map((booking) => {
      const seatArray = booking.seats.split(',');
      const seatCount = seatArray.length;

      return {
        id: booking.id,
        userId: booking.userId,
        userEmail: booking.User_Booking_userIdToUser?.email, // ✅ email user
        userName: booking.User_Booking_userIdToUser?.name, // (optional)
        eventId: booking.eventId,
        eventTitle: booking.Event?.title, // ✅ title event
        eventLocation: booking.Event?.location, // ✅ location event
        eventStartTime: booking.Event?.startTime, // (optional)
        seats: seatCount,
        totalPrice: booking.totalPrice,
        status: booking.status,
      };
    });

    return data;
  }

  async count() {
    const count = await this.prismaService.booking.count({
      where: {
        isDeleted: 0,
      },
    });

    if (!count) throw new BadRequestException('Count booking fail');

    return count;
  }

  async total() {
    const bookings = await this.prismaService.booking.findMany({
      where: {
        isDeleted: 0,
      },
    });

    const totalBooking = bookings.reduce(
      (total, booking) => total + booking.totalPrice.toNumber(),
      0,
    );
    if (!totalBooking) throw new BadRequestException('Count booking fail');

    return totalBooking;
  }

  async findOne(id: number) {
    const booking = await this.prismaService.booking.findUnique({
      where: {
        id: id,
        isDeleted: 0,
      },
      include: {
        User_Booking_userIdToUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Event: {
          select: {
            id: true,
            title: true,
            startTime: true,
            location: true,
          },
        },
      },
    });

    if (!booking) throw new BadRequestException('Find booking fail');

    const seatArray = booking.seats.split(',');
    const seatCount = seatArray.length;

    const data = {
      id: booking.id,
      userId: booking.userId,
      userEmail: booking.User_Booking_userIdToUser?.email, 
      userName: booking.User_Booking_userIdToUser?.name, 
      eventId: booking.eventId,
      eventTitle: booking.Event?.title, 
      eventLocation: booking.Event?.location, 
      eventStartTime: booking.Event?.startTime,
      seats: seatCount,
      totalPrice: booking.totalPrice,
      status: booking.status,
    };

    return data;
  }

  async updateStatus(updateStatusDto: UpdateStatusDto, id: number) {
    const validStatuses = ['Pending', 'Confirmed', 'Cancelled'];
    const { status } = updateStatusDto;
    if (!validStatuses.includes(status)) {
      throw new BadRequestException('Trạng thái không hợp lệ');
    }
    const booking = await this.prismaService.booking.findUnique({
      where: {
        id: id,
        isDeleted: 0,
      },
    });

    if (!booking) throw new BadRequestException('Find booking fail');

    const updateBookingId = await this.prismaService.booking.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });

    if (!updateBookingId) throw new BadRequestException('Update booking fail');

    const data = {
      id: updateBookingId.id,
      eventId: updateBookingId.eventId,
      userId: updateBookingId.userId,
      seats: updateBookingId.seats,
      totalPrice: updateBookingId.totalPrice,
      status: updateBookingId.status,
    };

    return data;
  }
}
