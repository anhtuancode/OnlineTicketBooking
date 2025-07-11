import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';


@Module({
  exports:[TokenService],
  providers: [TokenService, JwtService],
})
export class TokenModule {}
