import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Request } from 'express';
import { SkipPermission } from 'src/common/decorator/skip-permission.decorator';
import { UpdateStatusDto } from './dto/update-status.dto';


@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @SkipPermission()
  async create(@Body() createBookingDto: CreateBookingDto, @Req() req: Request) {
    return await this.bookingService.create(createBookingDto, req.user);
  }

  @Get()
  @SkipPermission()
  async findAll() {
    return await this.bookingService.findAll();
  }

  @Get('seats/:id')
  @SkipPermission()
  async seats(@Param('id') id: string) {
    return await this.bookingService.seats(+id);
  }

  @Get('count')
  @SkipPermission()
  async count() {
    return await this.bookingService.count();
  }

  @Get('total')
  @SkipPermission()
  async total() {
    return await this.bookingService.total();
  }

  @Get(':id')
  @SkipPermission()
  async findOne(@Param('id') id: string) {
    return await this.bookingService.findOne(+id);
  }

  @Put('update-status/:id')
  async updateStatus(@Body() updateBookingDto: UpdateStatusDto, @Param('id') id: string) {
    return this.bookingService.updateStatus(updateBookingDto, +id);
  }
}