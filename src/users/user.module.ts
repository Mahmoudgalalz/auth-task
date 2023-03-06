import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersService } from "./user.service";

@Module({
    imports:[PrismaModule],
    providers:[UsersService],
    exports:[UsersService]
})

export class UsersModule {}