import { Module } from '@nestjs/common';
import { ProductosProveedoresService } from './productos_proveedores.service';
import { ProductosProveedoresController } from './productos_proveedores.controller';
import { ProductosProveedore } from "./entities/productos_proveedore.entity"
@Module({
  controllers: [ProductosProveedoresController],
  providers: [ProductosProveedoresService],
  imports: [
    ProductosProveedore
  ]
})
export class ProductosProveedoresModule {}
