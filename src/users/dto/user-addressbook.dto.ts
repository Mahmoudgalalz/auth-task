import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserAddressBookDto {
    @IsEmail()
    @IsString()
    email?:string;
    
    @IsString()
    phone?:string;

    @IsString()
    country?: string;

    @IsString()
    city?: string;

    @IsString()
    street?: string;

}