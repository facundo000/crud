import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto } from './entities/producto.entity';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports: [
    Producto
  ]
})
export class ProductosModule {}
