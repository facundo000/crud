import { Injectable } from '@nestjs/common';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedore } from './entities/proveedore.entity';
import { Repository } from 'typeorm';
import { Barrio } from 'src/barrios/entities/barrio.entity';

@Injectable()
export class ProveedoresService {

  constructor(
    @InjectRepository(Proveedore)
    private readonly suppliersRepository: Repository<Proveedore>,
    @InjectRepository(Barrio)
    private readonly neighborhoodRepository: Repository<Barrio>
    
  ) {}

  async create(createProveedoreDto: CreateProveedoreDto) {
    const { id_neighborhood, ...rest } = createProveedoreDto

    const neighborhoodEntity = await this.neighborhoodRepository.findOne({
      where: { id: id_neighborhood }
    })

    if(!neighborhoodEntity) {
      throw new Error("neighborhood not found")
    }    
    const suppliers = this.suppliersRepository.create({
      ...rest,
      id_neighborhood: neighborhoodEntity
    })
    await this.suppliersRepository.save(suppliers)

    return suppliers
  }

  findAll() {
    const suppliers = this.suppliersRepository.find({
      relations: ['id_neighborhood']
    })
    return suppliers;
  }

  findOne(id: number) {
    return `This action returns a #${id} proveedore`;
  }

  update(id: number, updateProveedoreDto: UpdateProveedoreDto) {
    return `This action updates a #${id} proveedore`;
  }

  remove(id: number) {
    return `This action removes a #${id} proveedore`;
  }
}
