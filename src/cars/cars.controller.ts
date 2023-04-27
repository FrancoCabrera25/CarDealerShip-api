import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsServices: CarsService) {}
  @Get()
  getAllCars() {
    return this.carsServices.find();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsServices.findById(id);
  }

  @Post()
  create(@Body() createCardDto: CreateCarDto) {
    return createCardDto;
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() body: any) {
    return {
      id,
      body,
    };
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return id;
  }
}
