import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDTO } from './dto/signup.dto';
import { SigninDTO } from './dto/signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async signup(signupDTO: SignupDTO) {
    const { name, email, phone, password, confirm_password } = signupDTO;
    const role = 'user';

    const existUser = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existUser)
      throw new BadRequestException('Email is exist please choose another one');
    if (password != confirm_password)
      throw new BadRequestException(
        'Password and Confirm Password dont match, please fill again',
      );

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

    if (!newUser) throw new BadRequestException('Create user fail');

    const data = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
    };

    return data;
  }

  async signin(signinDTO: SigninDTO) {
    const { email, password } = signinDTO;

    const existUser = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existUser) throw new BadRequestException('Email is not exist');

    if (existUser.isDeleted)
      throw new BadRequestException(
        'This account has been blocked, please contact admin',
      );

    const isPassword = await bcrypt.compare(password, existUser.password);

    if (!isPassword)
      throw new BadRequestException('Password or Email is wrong');

    const userToken = this.tokenService.createToken(existUser.id);

    return userToken;
  }

  async forgotPassword(forgotPasswordDTO: ForgotPasswordDTO) {
    const { email, password, confirm_password } = forgotPasswordDTO;

    const existUser = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existUser) throw new BadRequestException('Email is not exist');

    if (password != confirm_password)
      throw new BadRequestException(
        'Password and Confirm Password dont match, please fill again',
      );

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const updateUser = await this.prismaService.user.update({
      where: {
        email: email,
      },
      data: {
        password: hashPassword,
      },
    });

    if (!updateUser) {
      throw new BadRequestException('Update user fail');
    }

    const data = {
      id: updateUser.id,
      name: updateUser.name,
      email: updateUser.email,
      phone: updateUser.phone,
      role: updateUser.role,
    };

    return data;
  }
}
