import { Controller, Get, Post, Body, Patch, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('account')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async register(@Body() registerDto:RegisterDto){
    const user = await this.authService.register(registerDto)
    const accessToken = this.authService.getAccessToken(user.id)

    return {user,accessToken}
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async login(@Headers() headers){
    const token = headers.authorization.split(' ')[1]
    const user = this.authService.getUserFromAccessToken(token)
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async updateProfile(@Body() updateProfileDto: UpdateUserDto, @Headers() headers){
    const token = headers.authorization.split(' ')[1]
    return this.authService.updateUser(token,updateProfileDto)
  }

  @Get('login')
  async getUser(@Body() loginDto:LoginDto){
    const user= await this.authService.getUser(loginDto)
    return user;
  }
}
