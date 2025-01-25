import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Marca } from './entities/marca.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { isUUID } from 'class-validator';

@Injectable()
export class MarcasService {

  constructor(
    @InjectRepository(Marca)
    private readonly brandRepository: Repository<Marca>
  ) {}
  
  async create(createMarcaDto: CreateMarcaDto) {
    try {
      const brand = this.brandRepository.create(createMarcaDto);
      await this.brandRepository.save(brand)
      
      return brand
    }
    catch(error) {
      throw new Error("Not found")
    }
  }

  findAll() {
    const brand = this.brandRepository.find()
    return brand;
  }

  async findOne(term: string) {
    
    let brand: Marca
    
    if(isUUID(term)) {
      brand = await this.brandRepository.findOneBy({ id: term })
    } else {
      const queryBuilder =  this.brandRepository.createQueryBuilder();
      brand = await queryBuilder
        .where(` UPPER(name) =:name`, {
          name: term.toUpperCase()
        }).getOne();
    }

      if(!brand) {
        throw new NotFoundException(`Brand whit id or name ${term} not found`);
      }

    return brand;
  }

  update(id: number, updateMarcaDto: UpdateMarcaDto) {
    return `This action updates a #${id} marca`;
  }

  remove(id: number) {
    return `This action removes a #${id} marca`;
  }
}
