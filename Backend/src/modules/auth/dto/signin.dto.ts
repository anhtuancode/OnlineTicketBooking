import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SigninDTO {
    @ApiProperty({ default: "abc@gmail.com" })
    @IsString({ message: 'Email must be a valid email address!' })
    @IsNotEmpty({ message: 'Email is required!' })
    email: string;

    @ApiProperty({ default: "123456" })
    @IsString({ message: 'Password must be a string!' })
    @IsNotEmpty({ message: 'Password is required!' })
    password: string;
}