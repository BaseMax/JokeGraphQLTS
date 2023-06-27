import { Injectable } from '@nestjs/common';
import { CreateJokeInput } from './dto/create-joke.input';
import { UpdateJokeInput } from './dto/update-joke.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JokeService {
  constructor(private readonly prisma: PrismaService) {}

  create(createJockInput: CreateJokeInput) {
    return this.prisma.joke.create({
      data: {
        text: createJockInput.text,
        Category: {
          connect: { id: createJockInput?.categoryId },
        },
      },
    });
  }

  search(query: string) {
    return this.prisma.joke.findMany({ where: { text: { contains: query } } });
  }
  async findAll() {
    return await this.prisma.joke.findMany({ include: { Category: true } });
  }

  findOne(id: number) {
    return this.prisma.joke.findUnique({
      where: { id },
      include: { Category: true },
    });
  }

  update(id: number, updateJockInput: UpdateJokeInput) {
    return this.prisma.joke.update({
      where: { id },
      data: {
        text: updateJockInput.text,
        updatedAt: new Date().toString(),
      },
    });
  }

  remove(id: number) {
    return this.prisma.joke.delete({ where: { id } });
  }
}
