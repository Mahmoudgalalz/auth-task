import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './user.service';

@Controller('account')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async create(@Body() createUsertDto: CreateUserDto){
        return this.userService.create(createUsertDto)
    }

}
