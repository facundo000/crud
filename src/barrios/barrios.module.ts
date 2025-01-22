import { Module } from '@nestjs/common';
import { BarriosService } from './barrios.service';
import { BarriosController } from './barrios.controller';
import { Barrio } from './entities/barrio.entity';

@Module({
  controllers: [BarriosController],
  providers: [BarriosService],
  imports: [
    Barrio
  ]
})
export class BarriosModule {}
