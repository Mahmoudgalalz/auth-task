import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare, hashSync } from 'bcryptjs';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService:UsersService,
    private jwtService: JwtService,
    ) {}

  async register(registerDto:RegisterDto){
    registerDto.password= hashSync(registerDto.password)

    try {
      const user = await this.usersService.create({
        ...registerDto,
      })
      return user;
    }
    catch(err){
      throw new HttpException(
        `${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
  async verfiyPassword(password:string , hashedPassword:string ){
    const isPasswordMatching = compare(password,hashedPassword)

    if(!isPasswordMatching){
      throw new HttpException(
        'The password is uncorrect',
        HttpStatus.UNAUTHORIZED
      )
    }
  }
  
  getAccessToken(id: string) {
    return this.jwtService.sign({ id });
  }

  async getUser(loginDto:LoginDto) {
    try{
      const user=await this.usersService.findByIdentifier(loginDto.username)

      await this.verfiyPassword(loginDto.password,user.password)
      return user
    }
    catch(err){
      throw new HttpException(
        'username is not found',
        HttpStatus.UNAUTHORIZED
      )
    }
  }

  getUserFromAccessToken(accessToken:string){
    const payload:User= this.jwtService.verify(accessToken,{
      secret:'SECRET_KEY'
    })
    return this.usersService.findByIdentifier(payload.username)
  }

  async updateUser(token:string,newData:UpdateUserDto){
    const {id}= await this.getUserFromAccessToken(token)
    return this.usersService.update(id,newData)
  }
}
