import { Injectable } from '@nestjs/common';
import { CreateProductosProveedoreDto } from './dto/create-productos_proveedore.dto';
import { UpdateProductosProveedoreDto } from './dto/update-productos_proveedore.dto';

@Injectable()
export class ProductosProveedoresService {
  create(createProductosProveedoreDto: CreateProductosProveedoreDto) {
    return 'This action adds a new productosProveedore';
  }

  findAll() {
    return `This action returns all productosProveedores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productosProveedore`;
  }

  update(id: number, updateProductosProveedoreDto: UpdateProductosProveedoreDto) {
    return `This action updates a #${id} productosProveedore`;
  }

  remove(id: number) {
    return `This action removes a #${id} productosProveedore`;
  }
}
