import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, phone, role } = createUserDto;

    const existingUser = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const password = '12345678';
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await this.prismaService.user.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        password: hashPassword,
        role: role,
      },
    });

    if (!newUser) {
      throw new BadRequestException('Failed to create user');
    }

    const data = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
    };

    return data;
  }

  async findAll() {
    const users = await this.prismaService.user.findMany({
      where: {
        isDeleted: 0,
      },
    });

    if (!users) throw new BadRequestException('Find all user fail');

    const data = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isDeleted: user.isDeleted,
      isActive: user.isActive,
    }));

    return data;
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });

    if (!user) throw new BadRequestException('User not found');

    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isDeleted: user.isDeleted,
      isActive: user.isActive,
    };

    return data;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });

    if (!user) throw new BadRequestException('User not found');

    const updateUser = await this.prismaService.user.update({
      where: { id: id },
      data: {
        ...updateUserDto,
        updatedAt: new Date(),
      },
    });

    if (!updateUser) throw new BadRequestException('Update user fail');

    const data = {
      id: updateUser.id,
      name: updateUser.name,
      email: updateUser.email,
      phone: updateUser.phone,
      role: updateUser.role,
    };

    return data;
  }

  async remove(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });

    if (!user) throw new BadRequestException('User not found');

    const removeUser = await this.prismaService.user.update({
      where: { id: id },
      data: { isDeleted: 1 },
    });

    const data = {
      id: removeUser.id,
      name: removeUser.name,
      email: removeUser.email,
      phone: removeUser.phone,
      role: removeUser.role,
      isDeleted: removeUser.isDeleted,
    };
    return data;
  }

  async toggleStatus(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });

    if (!user) throw new BadRequestException('User not found');

    const updateUser = await this.prismaService.user.update({
      where: { id: id },
      data: {
        isActive: user.isActive === 1 ? 0 : 1,
      },
    });

    if (!updateUser) throw new BadRequestException('Toggle status user fail');

    const data = {
      id: updateUser.id,
      name: updateUser.name,
      email: updateUser.email,
      phone: updateUser.phone,
      role: updateUser.role,
      isActive: updateUser.isActive,
    };

    return data;
  }
}
