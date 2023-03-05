import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "./dto/create-user.dto";
import { User as UserModel } from '@prisma/client'
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(private prisma:PrismaClient) {}

    async create(createUserDto: CreateUserDto) : Promise<UserModel> {
        const user = await this.prisma.user.create({data:createUserDto});
        return user;
    }

    async update(id:string, updateUserDto: UpdateUserDto) {
        const user = await this.prisma.user.update({
            where:{ id },
            data:updateUserDto
        })
    }
}