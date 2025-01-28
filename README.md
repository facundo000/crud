<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Step by step in nest 

1. config docker for data base

`docker-compose.yaml`
```yaml
version: '3'

services: 
  bd:
    image: postgres:14.3
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    container_name: crudPostgres
    volumes:
      - ./postgres:/var/lib/postgresql/data
```
2. up the db `docker-compose up`

3. Install environments variable for the project

`npm i @nestjs/config`

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],

})
export class AppModule {}

```

3. install TypeOrm 

`npm i @nestjs/typeorm typeorm`

install database, for postgres..
`npm install pg`

and configure



```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true
    })

  ],

})
export class AppModule {}

```

4. buil a new CRUD

`nest g res [name] --no-spec`
 
add decorator, primary key and column

```ts
@Entity()
export class Marca {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string
}
```

5. Import the entity in the module

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcasService } from './marcas.service';
import { MarcasController } from './marcas.controller';
import { Marca } from './entities/marca.entity';

@Module({
  controllers: [MarcasController],
  providers: [MarcasService],
  imports: [
    TypeOrmModule.forFeature([
      Marca
    ])
    
  ]
})
export class MarcasModule {}
```

6. Create relations

`marca.entity`
```ts
@OneToMany(
        () => Producto,
        (Producto) => Producto.id_brand,
        { cascade: true }
    )
    Products: Producto
```    

`productos.entity`
```ts
@ManyToOne(
        () => Marca,
        (Marca) => Marca.Products

    )
    id_brand: Marca
```

7. Install library class validators

`npm i class-validator class-transformer` 

 configure global Pipes
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.setGlobalPrefix('name_route');

  app.useGlobalPipes(  
    new ValidationPipe({ 
      whitelist: true, 
      forbidNonWhitelisted: true, 
    }) 
  );

  await app.listen(3000);
}
bootstrap();
```

8. Configure create DTO

`create-marca-dto.ts`

```ts
import { IsString, MinLength } from "class-validator";


export class CreateMarcaDto {
    
    @IsString()
    @MinLength(1)
    name: string
}
```

`create-marca-dto.ts`

```ts
import { IsNumber, IsOptional, IsPositive, IsString, IsUUID, MinLength } from "class-validator";


export class CreateProductoDto {

    @IsString()
    @MinLength(5)
    @IsOptional()
    description ?: string

    @IsNumber()
    @IsPositive()
    price: number

    @IsUUID()
    id_brand: string

    @IsUUID()
    id_category: string
}
```

9. CRUD

create

`marcas.service.ts`
```ts
constructor(
    @InjectRepository(Barrio)
    private readonly neighborhoodRepository: Repository<Barrio>
  ){}

async create(createBarrioDto: CreateBarrioDto) {
    try{
      const neighborhood = this.neighborhoodRepository.create(createBarrioDto);
      await this.neighborhoodRepository.save(neighborhood);

      return neighborhood
    }
    catch (error){
      console.log(error)
    }
  }
```
`productos.service.ts`

```ts
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

    //PK: id is identity of table Marca-Rubro
    //FK: id_brand-id_category is identity of table Producto
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

}

```
import in module

`productos.module.ts`

```ts
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
```
* findAll

`marcas.service.ts`
```ts
constructor(
    @InjectRepository(Barrio)
    private readonly neighborhoodRepository: Repository<Barrio>
  ){}

async create(createBarrioDto: CreateBarrioDto) {
    try{
      const neighborhood = this.neighborhoodRepository.create(createBarrioDto);
      await this.neighborhoodRepository.save(neighborhood);

      return neighborhood
    }
    catch (error){
      console.log(error)
    }
  }

  findAll() {
    const brand = this.brandRepository.find()
    return brand;
  }
```
with join

`producto.entity.ts`
```ts
    @ManyToOne(
        () => Marca,
        (Marca) => Marca.products
    )
    @JoinColumn({ name: "id_brand" })
    id_brand: Marca;

    @ManyToOne(
        () => Rubro,
        (Rubro) => Rubro.products
    )
    @JoinColumn({ name: "id_category" })
    id_category: Rubro
```
`productos.service.ts`

```ts
findAll() {
    const product = this.productRepository.find({
      relations: ['id_brand', 'id_category']
    })
}
```

* find by id or all with same description using queryBuilder

`productos.service.ts`
```ts
async findByIdxDescription(term: string): Promise<Producto[]> {
    let products: Producto[]

    if( isUUID(term) ){
      products = await this.productRepository.find({
        where: {cod_product: term},
        relations: ['id_brand', 'id_category']
      })
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder();
      products = await queryBuilder
        .leftJoinAndSelect('Producto.id_brand', 'brand') //Producto.id_brand same as entity - brand is a alias
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
```

`productos.controller.ts`
```ts
@Get(':term')
  findByIdxDescription(@Param('term') term: string) {
    return this.productosService.findByIdxDescription(term);
  }
```

* findById

`marcas.service.ts`
```ts
async findOne(id: string) {
    
    const brand = await this.brandRepository.findOneBy({ id: id })
    
    if(!brand) {
        throw new NotFoundException(`Brand whit id ${id} not found`);
      }

    return brand;
  }
```

`marcas.controller.ts`
```ts
 @Get(':id')
  findOne(@Param( 'id', ParseUUIDPipe) id: string) {
    return this.marcasService.findOne(id);
  }
```

* remove 

with fk in other table

`producto.entity.ts`
```ts
@ManyToOne(
        () => Marca,
        (Marca) => Marca.products,
        {onDelete:'CASCADE'}
    )
    @JoinColumn({ name: "id_brand" })
    id_brand: Marca;
```
`marcas.controller.ts`
```ts
@Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.marcasService.remove(id);
  }
```

`marcas.service.ts`
```ts
async remove(id: string) {
    const brand = await this.findOne(id);
    await this.brandRepository.remove(brand)

    return true
  }
```

* update

`marcas.controller.ts`
```ts
@Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateMarcaDto: UpdateMarcaDto
  ) {
    return this.marcasService.update(id, updateMarcaDto);
  }
```

`marcas.service.ts`
```ts
async update(id: string, updateMarcaDto: UpdateMarcaDto) {
    const brand = await this.brandRepository.preload({
      id:id,
      ...updateMarcaDto      
    })
    if(!brand) {
      throw new NotFoundException(`brand with id: ${brand} not found`)
    }

    try{
      await this.brandRepository.save(brand);

      return brand
    } catch (error) {
      if(error.code === '23505')
        throw new BadRequestException(error.detail)

      throw new InternalServerErrorException('Unexpeted error, check server logs')
    }

  }
```
with relations N vs 1

`productos.service.ts`
```ts
async update(id: string, updateProductoDto: UpdateProductoDto) {
    
    const { id_brand, id_category, ...rest } = updateProductoDto

    const product = await this.productRepository.preload({
      cod_product:id,
      ...rest
    })

    const brand = await this.brandRepository.findOne({
       where: {id: id_brand}
      })
      product.id_brand = brand

    const category = await this.categoryRepository.findOne({
      where: { id_category }
    })
    product.id_category = category

    if( !brand || !category ){
      throw new NotFoundException(`id_brand or id_category not found`)
    }

    if(!product){
      throw new NotFoundException(`product with id: ${id} not found`)
    }

    try{
      this.productRepository.save(product);

      return product;
    } catch (error) {
      if(error.code === '23505'){
        throw new BadRequestException(error.detail)
      }

      throw new InternalServerErrorException('Unexpeted error, check server logs')
    }
  
  }
```