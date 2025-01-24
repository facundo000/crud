import { Injectable } from '@nestjs/common';
import { CreateBarrioDto } from './dto/create-barrio.dto';
import { UpdateBarrioDto } from './dto/update-barrio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Barrio } from './entities/barrio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BarriosService {

  constructor(
    @InjectRepository(Barrio)
    private readonly neighborhoodRepository: Repository<Barrio>
  ){}

  async create(createBarrioDto: CreateBarrioDto) {
    try{
      const neighborhood = this.neighborhoodRepository.create(createBarrioDto);
      await this.neighborhoodRepository.save(neighborhood);

      return neighborhood
    }
    catch (error){
      console.log(error)
    }
  }

  findAll() {
    const neighborhoods = this.neighborhoodRepository.find()
    return neighborhoods;
  }

  findOne(id: number) {
    return `This action returns a #${id} barrio`;
  }

  update(id: number, updateBarrioDto: UpdateBarrioDto) {
    return `This action updates a #${id} barrio`;
  }

  remove(id: number) {
    return `This action removes a #${id} barrio`;
  }
}
