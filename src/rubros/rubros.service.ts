import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRubroDto } from './dto/create-rubro.dto';
import { UpdateRubroDto } from './dto/update-rubro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rubro } from './entities/rubro.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { isUUID } from 'class-validator';

@Injectable()
export class RubrosService {

  constructor(
    @InjectRepository(Rubro)
    private readonly categoryRepository: Repository<Rubro>
  ) {}

  async create(createRubroDto: CreateRubroDto) {
    const category = this.categoryRepository.create(createRubroDto)
    await this.categoryRepository.save(category)

    return category
  }

  findAll() {
    let category = this.categoryRepository.find()

    return category;
  }

  async findOne(id: string) {    
      const category = await this.categoryRepository.findOneBy({id_category: id })

      if(!category){
        throw new NotFoundException(`category with id ${category} not found`)
      }

      return category    
  }

  async update(id: string, updateRubroDto: UpdateRubroDto) {
    const category = await this.categoryRepository.preload({
      id_category: id,
      ...updateRubroDto
    })

    if(!category){
      throw new NotFoundException(`category with id: ${category} not found`);
    }

    try {
      await this.categoryRepository.save(category);

      return category;
    } catch (error){
      if(error.code === '23505'){
        throw new BadRequestException(error.detail)
      }
      throw new InternalServerErrorException('Unexpeted error, check server logs')
    }
  }

  remove(id: number) {
    return `This action removes a #${id} rubro`;
  }
}
