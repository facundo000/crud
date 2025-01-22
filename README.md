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
import { MarcasService } from './marcas.service';
import { MarcasController } from './marcas.controller';
import { Marca } from './entities/marca.entity';

@Module({
  controllers: [MarcasController],
  providers: [MarcasService],
  imports: [
    Marca
  ]
})
export class MarcasModule {}
```