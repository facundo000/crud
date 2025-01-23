import { Module } from '@nestjs/common';
import { ProductosProveedoresService } from './productos_proveedores.service';
import { ProductosProveedoresController } from './productos_proveedores.controller';
import { ProductosProveedore } from "./entities/productos_proveedore.entity"
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [ProductosProveedoresController],
  providers: [ProductosProveedoresService],
  imports: [
    TypeOrmModule.forFeature([
      
      ProductosProveedore
    ])
  ]
})
export class ProductosProveedoresModule {}
