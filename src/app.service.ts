import { Injectable } from '@nestjs/common';
import { PrisamService } from './prisma.service';
import {User} from '@prisma/client'

@Injectable()
export class AppService {
  constructor(private prisma: PrisamService){}
  async createUser(userData): Promise<User>{
    const result = await this.prisma.user.create({data:userData})
    return result;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
