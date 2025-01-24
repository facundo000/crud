import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto } from './entities/producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marca } from 'src/marcas/entities/marca.entity';
import { Rubro } from 'src/rubros/entities/rubro.entity';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports: [
    TypeOrmModule.forFeature([

      Producto,
      Marca,
      Rubro
    ])
  ]
})
export class ProductosModule {}
