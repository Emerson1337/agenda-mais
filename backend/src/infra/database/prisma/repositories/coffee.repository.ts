import { CoffeeRepository } from '@src/application/use-cases/coffee/repositories/coffee.repository';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Coffee } from '@src/domain/entities/coffee.entity';

@Injectable()
export class PrismaCoffeeRepository implements CoffeeRepository {
  constructor(private prisma: PrismaService) {}

  async create(coffee: Coffee): Promise<Coffee> {
    return this.prisma.coffees.create({
      data: coffee,
    });
  }

  async getAll(): Promise<Array<Coffee>> {
    try {
      return this.prisma.coffees.findMany();
    } catch (error) {
      console.error(error);
    }
  }

  async findByName(name: string): Promise<Coffee> {
    return this.prisma.coffees.findUnique({
      where: { name },
    });
  }
}
