import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

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

  public create({ model, brand }: CreateCarDto): Car {
    const car: Car = {
      id: uuid(),
      brand,
      model,
    };

    this.cars.push(car);

    return car;
  }

  public async update(id: string, updateCarDto: UpdateCarDto) {
    let updateCar = await this.findById(id);

    this.cars = this.cars.map((car: Car) => {
      if (car.id === id) {
        updateCar = {
          ...car,
          ...updateCarDto,
          id,
        };
        return updateCar;
      }
      return car;
    });

    return updateCar;
  }

  public delete(id: string) {
    if (this.findById(id)) {
      this.cars = this.cars.filter((car: Car) => car.id !== id);
    }
  }
}
