import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
      relations: ['id_suppliers', 'id_products'],
    });

    return productsSuppliers;
  }

  findOne(id: number) {
    return `This action returns a #${id} productosProveedore`;
  }

  async update(id: string, updateProductosProveedoreDto: UpdateProductosProveedoreDto) {
    const { id_products, id_suppliers, ...rest } = updateProductosProveedoreDto


    const productsSuppliers = await this.productsSuppliersRepository.preload({
      id: id,
      ...rest
    })

    const product = await this.productosRepository.findOne({
      where: {cod_product: id_products}
    })
    productsSuppliers.id_products = product

    const supplier = await this.proveedoresRepository.findOne({
      where: {cod_prov: id_suppliers}
    })
    productsSuppliers.id_suppliers = supplier

    if(!product || !supplier){
      throw new NotFoundException(`id_products or id_suppliers not found`)
    }

    if(!productsSuppliers) {
      throw new NotFoundException(`id with ${id} not found`)
    }

    try {
      await this.productsSuppliersRepository.save(productsSuppliers)

      return productsSuppliers
    } catch(error) {
      if(error.code === '23505'){
        throw new BadRequestException(error.detail);
      }
      throw new InternalServerErrorException('internal error')
    }

  }

  remove(id: number) {
    return `This action removes a #${id} productosProveedore`;
  }
}
