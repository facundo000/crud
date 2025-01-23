import { IsEmail, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";



export class CreateProveedoreDto {

    @IsString()
    @MinLength(1)
    name: string

    @IsString()
    @MinLength(3)
    direction: string

    @IsNumber()
    @IsPositive()
    @IsOptional()
    phone: string

    @IsEmail()
    @IsOptional()
    mail: string
}
