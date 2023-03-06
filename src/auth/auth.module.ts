import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersModule } from '../users/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/user.service';

@Module({
  imports:[
    PrismaModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret:'SECRET_KEY',
      signOptions: { expiresIn: '60day'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,UsersService],
  exports:[AuthService],
})
export class AuthModule {}
