import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBarrioDto } from './dto/create-barrio.dto';
import { UpdateBarrioDto } from './dto/update-barrio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Barrio } from './entities/barrio.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { error } from 'console';

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

  async findAll() {
    try {
      const neighborhoods = await this.neighborhoodRepository.find()
      
      return neighborhoods;
    }
    catch(error) {
      throw new Error("not found")
    }
  }

  async findOne(id: string) {
    const neighborhood = await this.neighborhoodRepository.findOneBy({id})

    if(!neighborhood){
      throw new NotFoundException(`neighborhood with id ${id} not found`)
    }

    return neighborhood
  }

  async update(id: string, updateBarrioDto: UpdateBarrioDto) {
    const neighborhood = await this.neighborhoodRepository.preload({
      id: id,
      ...updateBarrioDto
    })

    if(!neighborhood){
      throw new NotFoundException(`neighborhood with id: ${neighborhood} not found`)
    }

    try {
      await this.neighborhoodRepository.save(neighborhood);

      return neighborhood;
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async remove(id: string) {

    const neighborhood = await this.findOne(id);
    await this.neighborhoodRepository.remove(neighborhood)

    return true;
  }
}
