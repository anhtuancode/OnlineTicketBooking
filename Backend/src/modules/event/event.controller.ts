import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  Req,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadImageDto } from './dto/upload-image.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @Public()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: UploadImageDto,
  })
  async create(
    @Body() createEventDto: CreateEventDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.eventService.create(createEventDto, file);
  }

  @Get('search')
  @Public()
  async search(
    @Query('title') title: string,
    @Query('location') location?: string,
    @Query('price') price?: number,
    @Query('date') date?: string,
  ) {
    return await this.eventService.search(title, price, location, date);
  }

  @Get('count')
  @Public()
  async count() {
    return await this.eventService.count();
  }

  @Get()
  @Public()
  async findAll() {
    return await this.eventService.findAll();
  }

  @Get('movies')
  @Public()
  async findMovies() {
    return await this.eventService.findMovies();
  }

  @Get('events')
  @Public()
  async findEvents() {
    return await this.eventService.findEvents();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Put(':id')
  @Public()
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
