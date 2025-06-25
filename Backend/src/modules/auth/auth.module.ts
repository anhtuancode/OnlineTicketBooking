import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenService } from '../token/token.service';
import { TokenModule } from '../token/token.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, TokenService],
  imports:[TokenModule, JwtModule]
})
export class AuthModule {}
