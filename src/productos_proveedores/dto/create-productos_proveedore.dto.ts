import { IsNumber, IsPositive, IsUUID } from "class-validator";


export class CreateProductosProveedoreDto {
    
    @IsUUID()
    id_suppliers: string

    @IsUUID()
    id_products: string
}
