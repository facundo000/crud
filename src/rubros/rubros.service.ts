import { Injectable } from '@nestjs/common';
import { CreateRubroDto } from './dto/create-rubro.dto';
import { UpdateRubroDto } from './dto/update-rubro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rubro } from './entities/rubro.entity';
import { Repository } from 'typeorm';

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
    return `This action returns all rubros`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rubro`;
  }

  update(id: number, updateRubroDto: UpdateRubroDto) {
    return `This action updates a #${id} rubro`;
  }

  remove(id: number) {
    return `This action removes a #${id} rubro`;
  }
}
