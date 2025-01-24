import { Module } from '@nestjs/common';
import { ProductosProveedoresService } from './productos_proveedores.service';
import { ProductosProveedoresController } from './productos_proveedores.controller';
import { ProductosProveedore } from "./entities/productos_proveedore.entity"
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Proveedore } from 'src/proveedores/entities/proveedore.entity';
@Module({
  controllers: [ProductosProveedoresController],
  providers: [ProductosProveedoresService],
  imports: [
    TypeOrmModule.forFeature([
      
      ProductosProveedore,
      Producto,
      Proveedore
    ])
  ]
})
export class ProductosProveedoresModule {}
