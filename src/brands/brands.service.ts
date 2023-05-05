import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    {
      id: uuid(),
      name: 'Toyota',
      createdAt: new Date().getTime(),
    },
  ];
  create({ name }: CreateBrandDto) {
    const brand: Brand = {
      id: uuid(),
      name,
      createdAt: new Date().getTime(),
    };
    this.brands.push(brand);
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    return brand;
  }

  update(id: string, { name }: UpdateBrandDto) {
    let brandUpdate = this.findOne(id);

    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        brandUpdate.updateAt = new Date().getTime();
        brandUpdate = {
          ...brandUpdate,
          name,
        };
        return brandUpdate;
      }
      return brand;
    });
    return brandUpdate;
  }

  remove(id: string) {
    this.brands = this.brands.filter((brand) => brand.id !== id);
  }
}
