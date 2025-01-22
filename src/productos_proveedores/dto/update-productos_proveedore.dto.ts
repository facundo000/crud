import { PartialType } from '@nestjs/mapped-types';
import { CreateProductosProveedoreDto } from './create-productos_proveedore.dto';

export class UpdateProductosProveedoreDto extends PartialType(CreateProductosProveedoreDto) {}
