import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';
import { Proveedore } from './entities/proveedore.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barrio } from 'src/barrios/entities/barrio.entity';

@Module({
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
  imports: [
    TypeOrmModule.forFeature([
      Proveedore,
      Barrio
    ])
  ]
})
export class ProveedoresModule {}
