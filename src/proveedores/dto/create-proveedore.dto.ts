import { IsEmail, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MinLength } from "class-validator";



export class CreateProveedoreDto {

    @IsString()
    @MinLength(1)
    name: string

    @IsString()
    @MinLength(3)
    direction: string

    @IsNumber()
    @IsPositive()
    phone: string

    @IsUUID()
    id_neighborhood: string

    @IsEmail()
    @IsOptional()
    mail?: string
}
