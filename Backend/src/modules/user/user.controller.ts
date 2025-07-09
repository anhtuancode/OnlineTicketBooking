import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()      
  @Public()
  findAll() {
    return this.userService.findAll();
  }

  @Get('count')      
  @Public()
  countUser() {
    return this.userService.countUser();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Put(':id')
  @Public()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Put('toggle-status/:id')
  @Public()
  async restore(@Param('id') id: string) {
    return await this.userService.toggleStatus(+id);
  }


}
