import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcryptjs';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/user.service';
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
        name: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        street: ''
      })
      return user;
    }
    catch(err){
      throw new HttpException(
        "",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
  async verfiyPassword(password:string , hashedPassword:string ){
    const isPasswordMatching = compareSync(password,hashedPassword)

    if(!isPasswordMatching){
      throw new HttpException(
        'The password is uncorrect',
        HttpStatus.UNAUTHORIZED
      )
    }
  }


  async getUser(username:string , password:string) {
    try{
      const user=await this.usersService.get(username)

      await this.verfiyPassword(password,user.password)

      return user
    }
    catch(err){
      throw new HttpException(
        'username is not definded',
        HttpStatus.UNAUTHORIZED
      )
    }
  }

  async updateUser(id:string, newData:UpdateUserDto){
    return this.usersService.update(id,newData)
  }
}
