import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";


export class CreateProductoDto {

    @IsString()
    @MinLength(5)
    @IsOptional()
    description ?: string

    @IsNumber()
    @IsPositive()
    price: number
}
