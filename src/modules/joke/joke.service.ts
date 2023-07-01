import { Injectable } from '@nestjs/common';
import { CreateJokeInput } from './dto/create-joke.input';
import { UpdateJokeInput } from './dto/update-joke.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JokeService {
  constructor(private readonly prisma: PrismaService) {}

  create(createJokeInput: CreateJokeInput) {
    return this.prisma.joke.create({
      data: {
        text: createJokeInput.text,
        Category: {
          connect: { id: createJokeInput?.categoryId },
        },
      },
    });
  }

  async getRandomJoke() {
    const jokeCount = await this.prisma.joke.count();
    const randomIndex = Math.floor(Math.random() * jokeCount);
    return await this.prisma.joke.findFirst({
      skip: randomIndex,
    });
  }

  async search(query: string) {
    return await this.prisma.joke.findMany({
      where: { text: { contains: query } },
    });
  }

  getJokesByFilter(filter) {}

  getTopJokes() {
    return this.prisma.joke.findMany({
      orderBy: { rate: 'desc' },
      include: { Category: true },
    });
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

  update(id: number, updateJokeInput: UpdateJokeInput) {
    return this.prisma.joke.update({
      where: { id },
      data: {
        text: updateJokeInput.text,
        updatedAt: new Date().toString(),
      },
    });
  }

  remove(id: number) {
    return this.prisma.joke.delete({ where: { id } });
  }
}
