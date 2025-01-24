import { Injectable } from '@nestjs/common';
import { CreateProductosProveedoreDto } from './dto/create-productos_proveedore.dto';
import { UpdateProductosProveedoreDto } from './dto/update-productos_proveedore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductosProveedore } from './entities/productos_proveedore.entity';
import { Repository } from 'typeorm';
import { Proveedore } from 'src/proveedores/entities/proveedore.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class ProductosProveedoresService {
  constructor(
    @InjectRepository(ProductosProveedore)
    private readonly productsSuppliersRepository: Repository<ProductosProveedore>,
    @InjectRepository(Proveedore)
    private readonly proveedoresRepository: Repository<Proveedore>,
    @InjectRepository(Producto)
    private readonly productosRepository: Repository<Producto>
  ) {}

  async create(createProductosProveedoreDto: CreateProductosProveedoreDto) {
    const { id_suppliers, id_products } = createProductosProveedoreDto;

    const supplierEntity = await this.proveedoresRepository.findOne({ where: { cod_prov: id_suppliers } });
    const productEntity = await this.productosRepository.findOne({ where: { cod_product: id_products } });

    if (!supplierEntity || !productEntity) {
      throw new Error('Supplier or Product not found');
    }

    const productsSuppliers = this.productsSuppliersRepository.create({
      id_suppliers: supplierEntity,
      id_products: productEntity,
    });

    await this.productsSuppliersRepository.save(productsSuppliers);

    return productsSuppliers;
  }

  findAll() {
    const productsSuppliers = this.productsSuppliersRepository.find({
      relations: ['proveedore','producto']
    })

    return productsSuppliers;
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
