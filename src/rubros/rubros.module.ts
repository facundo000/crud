import { Module } from '@nestjs/common';
import { RubrosService } from './rubros.service';
import { RubrosController } from './rubros.controller';
import { Rubro } from './entities/rubro.entity';

@Module({
  controllers: [RubrosController],
  providers: [RubrosService],
  imports: [
    Rubro
  ]
})
export class RubrosModule {}
