import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';

@Module({
  imports: [AuthModule, TokenModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
