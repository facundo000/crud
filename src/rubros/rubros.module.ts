import { Module } from '@nestjs/common';
import { RubrosService } from './rubros.service';
import { RubrosController } from './rubros.controller';
import { Rubro } from './entities/rubro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RubrosController],
  providers: [RubrosService],
  imports: [
    TypeOrmModule.forFeature([

      Rubro
    ])
  ]
})
export class RubrosModule {}
