import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Marca } from './entities/marca.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { isUUID } from 'class-validator';
import { error } from 'console';

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

  async findOne(id: string) {
    
    const brand = await this.brandRepository.findOneBy({ id: id })
    
    if(!brand) {
        throw new NotFoundException(`Brand whit id ${id} not found`);
      }

    return brand;
  }

  async update(id: string, updateMarcaDto: UpdateMarcaDto) {
    const brand = await this.brandRepository.preload({
      id:id,
      ...updateMarcaDto      
    })
    if(!brand) {
      throw new NotFoundException(`brand with id: ${brand} not found`)
    }

    try{
      await this.brandRepository.save(brand);

      return brand
    } catch (error) {
      if(error.code === '23505')
        throw new BadRequestException(error.detail)

      throw new InternalServerErrorException('Unexpeted error, check server logs')
    }

  }

  async remove(id: string) {
    const brand = await this.findOne(id);
    await this.brandRepository.remove(brand)

    return true
  }
}
