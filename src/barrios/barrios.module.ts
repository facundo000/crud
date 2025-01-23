import { Module } from '@nestjs/common';
import { BarriosService } from './barrios.service';
import { BarriosController } from './barrios.controller';
import { Barrio } from './entities/barrio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [BarriosController],
  providers: [BarriosService],
  imports: [
    TypeOrmModule.forFeature([
      Barrio

    ])
  ]
})
export class BarriosModule {}
