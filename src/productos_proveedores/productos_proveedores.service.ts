import { Injectable } from '@nestjs/common';
import { CreateProductosProveedoreDto } from './dto/create-productos_proveedore.dto';
import { UpdateProductosProveedoreDto } from './dto/update-productos_proveedore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductosProveedore }from './entities/productos_proveedore.entity'
import { Repository } from 'typeorm';

@Injectable()
export class ProductosProveedoresService {
  constructor(
    @InjectRepository(ProductosProveedore)
    private readonly productsSuppliersRepository: Repository<ProductosProveedore>
  ) {}

  async create(createProductosProveedoreDto: CreateProductosProveedoreDto) {
    const productsSuppliers = this.productsSuppliersRepository.create(createProductosProveedoreDto)
    await this.productsSuppliersRepository.save(productsSuppliers)

    return productsSuppliers
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
