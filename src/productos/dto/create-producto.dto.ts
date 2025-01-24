import { IsNumber, IsOptional, IsPositive, IsString, IsUUID, MinLength } from "class-validator";


export class CreateProductoDto {

    @IsString()
    @MinLength(5)
    @IsOptional()
    description ?: string

    @IsNumber()
    @IsPositive()
    price: number

    @IsUUID()
    id_brand: string

    @IsUUID()
    id_category: string
}
