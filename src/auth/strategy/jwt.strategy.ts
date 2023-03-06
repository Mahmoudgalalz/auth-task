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
            //dump key, better not change if you use the same DB
            secretOrKey: 'SECRET_KEY'
        });
    }

    validate({id}:User) : Promise<User>{
        return this.usersService.findById(id)
    }
}
