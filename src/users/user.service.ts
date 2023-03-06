import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaClient, User as UserModel } from "@prisma/client";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { hashSync } from "bcryptjs";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class UsersService {
    constructor(private prisma:PrismaService) {}

    async create(createUserDto: CreateUserDto) : Promise<UserModel> {
        createUserDto.password = hashSync(createUserDto.password)
        const user = await this.prisma.user.create({data:createUserDto});
        return user;
    }

    async update(id:string, updateUserDto: UpdateUserDto) {
        const user = await this.prisma.user.update({
            where:{ id },
            data:updateUserDto
        })
        return 'Updated'
    }
    
    async findById(id: string): Promise<UserModel> {
        const user = await this.prisma.user.findFirst({ where: { id } });
    
        if (user) {
          return user;
        }
    
        throw new HttpException('A user with this username/email does not exist.', HttpStatus.NOT_FOUND);
    }

    async findByIdentifier(username:string) : Promise<any>{
        const user = await this.prisma.user.findFirst({
            where:{username}
        })
        if(user)
        {
            return user;
        }
        throw new HttpException('A username does not exist',HttpStatus.NOT_FOUND)
    }
}