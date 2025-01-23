import { IsNumber, IsPositive, IsUUID } from "class-validator";


export class CreateProductosProveedoreDto {
    
    @IsUUID()
    suppliers: string

    @IsUUID()
    products: string
}
