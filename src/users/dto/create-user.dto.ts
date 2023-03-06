import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { UserAddressBookDto } from "./user-addressbook.dto";

export class CreateUserDto extends UserAddressBookDto {
    @MinLength(3)
    @Transform(({ value }) => (value as string).toLowerCase().replace(/[ ]/gi, '-'))
    @Matches(/^[a-z0-9-]+$/, {
      message: 'username can contain only lowercase characters, numbers and hyphens',
    })
    username: string;

    @IsNotEmpty()
    password:string;
    
    @IsString()
    name?: string;

}