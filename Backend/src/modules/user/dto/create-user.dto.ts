import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ default: "Nguyen Anh Tuan" })    
    @IsString({ message: 'Name must be a string!' })
    @IsNotEmpty({ message: 'Name is required!' })
    name: string;

    @ApiProperty({ default: "abc@gmail.com" })
    @IsString({ message: 'Email must be a valid email address!' })
    @IsNotEmpty({ message: 'Email is required!' })
    email: string;

    @ApiProperty({ default: "abc@gmail.com" })
    @IsString({ message: 'Phone must be a string!' })
    @IsNotEmpty({ message: 'Email is required!' })
    phone: string;

    @ApiProperty({ default: "user" })
    @IsString({ message: 'Role must be a string!' })
    @IsNotEmpty({ message: 'Role is required!' })
    role: string;
}
