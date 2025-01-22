import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductosProveedoresService } from './productos_proveedores.service';
import { CreateProductosProveedoreDto } from './dto/create-productos_proveedore.dto';
import { UpdateProductosProveedoreDto } from './dto/update-productos_proveedore.dto';

@Controller('productos-proveedores')
export class ProductosProveedoresController {
  constructor(private readonly productosProveedoresService: ProductosProveedoresService) {}

  @Post()
  create(@Body() createProductosProveedoreDto: CreateProductosProveedoreDto) {
    return this.productosProveedoresService.create(createProductosProveedoreDto);
  }

  @Get()
  findAll() {
    return this.productosProveedoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosProveedoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductosProveedoreDto: UpdateProductosProveedoreDto) {
    return this.productosProveedoresService.update(+id, updateProductosProveedoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosProveedoresService.remove(+id);
  }
}
