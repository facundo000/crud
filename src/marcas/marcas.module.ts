import { Module } from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { MarcasController } from './marcas.controller';
import { Marca } from './entities/marca.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

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
