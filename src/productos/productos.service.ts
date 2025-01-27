import { Injectable, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { Marca } from 'src/marcas/entities/marca.entity';
import { Rubro } from 'src/rubros/entities/rubro.entity';
import { isUUID } from 'class-validator';


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
      where: { id_category: id_category }
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

  async findOne(term: string): Promise<Producto[]> {
    let products: Producto[]

    if( isUUID(term) ){
      products = await this.productRepository.find({
        where: {cod_product: term},
        relations: ['id_brand', 'id_category']
      })
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder();
      products = await queryBuilder
        .leftJoinAndSelect('Producto.id_brand', 'brand')
        .leftJoinAndSelect('Producto.id_category', 'category')
        .where(`UPPER(Producto.description) LIKE :description`, {
          description: `%${term.toUpperCase()}%`
        }).getMany()
    }

    if(!products){
      throw new NotFoundException(`Product with ${term} not found`)
    }

    return products;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
