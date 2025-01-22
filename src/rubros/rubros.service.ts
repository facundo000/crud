import { Injectable } from '@nestjs/common';
import { CreateRubroDto } from './dto/create-rubro.dto';
import { UpdateRubroDto } from './dto/update-rubro.dto';

@Injectable()
export class RubrosService {
  create(createRubroDto: CreateRubroDto) {
    return 'This action adds a new rubro';
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
