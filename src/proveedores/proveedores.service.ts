import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedore } from './entities/proveedore.entity';
import { Repository } from 'typeorm';
import { Barrio } from 'src/barrios/entities/barrio.entity';
import { isUUID } from 'class-validator';

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

  async finOneById(id: string) {
    const supplier = await this.suppliersRepository.findOneBy({ cod_prov:id })

    if(!supplier) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }

    return supplier
  }

  async findOne(term: string): Promise<Proveedore[]> {
    let suppliers: Proveedore[]

    if(isUUID(term)){
      suppliers = await this.suppliersRepository.find({
        where: {cod_prov: term},
        relations: ['id_neighborhood']
      })
    } else {
      const queryBuilder = this.suppliersRepository.createQueryBuilder();
      suppliers = await queryBuilder
      .leftJoinAndSelect('Proveedore.id_neighborhood', 'neighborhood')
      .where(`UPPER(Proveedore.name) LIKE :name`, {
        name: `%${term.toUpperCase()}%`
      }).getMany()
    }

    if(!suppliers){
      throw new NotFoundException(`suppliers with ${term} not found`)
    }

    return suppliers;
  }

  update(id: number, updateProveedoreDto: UpdateProveedoreDto) {
    return `This action updates a #${id} proveedore`;
  }

  async remove(id: string) {
    const supplier = await this.finOneById(id)
    await this.suppliersRepository.remove(supplier)

    return true;
  }
}
