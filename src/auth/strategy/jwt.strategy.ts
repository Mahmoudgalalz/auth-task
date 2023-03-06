import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor( private readonly usersService: UsersService ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SECRET_KEY'
        });
    }

    validate({id}:User) : Promise<User>{
        return this.usersService.findById(id)
    }
}