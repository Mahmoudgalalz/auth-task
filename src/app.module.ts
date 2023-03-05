import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersController } from './users/user.controller';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    
  ],
  providers: [AppService],
})
export class AppModule {}
