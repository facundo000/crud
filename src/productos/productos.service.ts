import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { Marca } from 'src/marcas/entities/marca.entity';
import { Rubro } from 'src/rubros/entities/rubro.entity';

@Injectable()
export class ProductosService {

  constructor(
    @InjectRepository(Producto)
    private readonly productRepository: Repository<Producto>,
    @InjectRepository(Marca)
    private readonly brandRepository: Repository<Marca>,
    @InjectRepository(Rubro)
    private readonly categoryRepository: Repository<Rubro>

  ) {}

  async create(createProductoDto: CreateProductoDto) {
    const { id_brand, id_category, ...rest } = createProductoDto;

    //PK id is identity of table Marca-Rubro
    //FK id_brand-id_category is identity of table Producto
    const brandEntity = await this.brandRepository.findOne({
      where: { id: id_brand }       
    })
    const categoryEntity = await this.categoryRepository.findOne({
      where: { id: id_category }
    })

    if(!brandEntity || !categoryEntity){
      throw new Error("brand or category not found");
    }

    const product = this.productRepository.create({
      ...rest,
      id_brand: brandEntity,
      id_category: categoryEntity,
    });
    await this.productRepository.save(product);

    return product;
  }

  findAll() {
    const product = this.productRepository.find({
      relations: ['id_brand', 'id_category']
    })

    return product;
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
