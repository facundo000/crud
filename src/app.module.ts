import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcasModule } from './marcas/marcas.module';
import { RubrosModule } from './rubros/rubros.module';
import { ProductosModule } from './productos/productos.module';
import { ProductosProveedoresModule } from './productos_proveedores/productos_proveedores.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { BarriosModule } from './barrios/barrios.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.BD_HOST,
      port: +process.env.BD_PORT,
      database: process.env.BD_NAME,
      username: process.env.BD_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true
    }),

    MarcasModule,

    RubrosModule,

    ProductosModule,

    ProductosProveedoresModule,

    ProveedoresModule,

    BarriosModule
    
  ],

})
export class AppModule {}
