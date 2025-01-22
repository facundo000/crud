import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BarriosService } from './barrios.service';
import { CreateBarrioDto } from './dto/create-barrio.dto';
import { UpdateBarrioDto } from './dto/update-barrio.dto';

@Controller('barrios')
export class BarriosController {
  constructor(private readonly barriosService: BarriosService) {}

  @Post()
  create(@Body() createBarrioDto: CreateBarrioDto) {
    return this.barriosService.create(createBarrioDto);
  }

  @Get()
  findAll() {
    return this.barriosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barriosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBarrioDto: UpdateBarrioDto) {
    return this.barriosService.update(+id, updateBarrioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barriosService.remove(+id);
  }
}
