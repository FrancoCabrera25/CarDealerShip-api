import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  public find(): any {
    return this.cars;
  }

  public async findById(id: string): Promise<any> {
    const car = this.cars.find((car: Car) => car.id === id);

    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    return car;
  }
}
