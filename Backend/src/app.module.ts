import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';
import { EventModule } from './modules/event/event.module';
import { ProtectStrategy } from './modules/auth/protect/protect.strategy';
import { PermissionStrategy } from './modules/auth/permission/permission.strategy';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AuthModule, TokenModule, EventModule, UserModule],
  controllers: [AppController],
  providers: [AppService, ProtectStrategy, PrismaService, PermissionStrategy],
})
export class AppModule {}
