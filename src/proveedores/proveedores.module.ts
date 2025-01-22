import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';
import { Proveedore } from './entities/proveedore.entity';

@Module({
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
  imports: [
    Proveedore
  ]
})
export class ProveedoresModule {}
