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

  getJokesByFilter(id: number) {
    return this.prisma.joke.findMany({
      where: { categoryId: id },
      include: { Category: true, Like: true, Comment: true, Tags: true },
    });
  }

  async getRandomJoke() {
    const jokeCount = await this.prisma.joke.count();
    const randomIndex = Math.floor(Math.random() * jokeCount);
    return await this.prisma.joke.findFirst({
      skip: randomIndex,
      include: { Category: true, Like: true, Comment: true, Tags: true },
    });
  }

  getHotJokes() {
    return this.prisma.joke.findMany({
      include: { Category: true, Like: true, Comment: true, Tags: true },
      orderBy: {
        Activite: {
          _count: 'desc',
        },
      },
    });
  }

  async search(query: string) {
    return await this.prisma.joke.findMany({
      where: { text: { contains: query } },
      include: { Category: true, Like: true, Comment: true, Tags: true },
    });
  }

  getTopJokes() {
    return this.prisma.joke.findMany({
      orderBy: { rate: 'desc' },
      include: { Category: true, Like: true, Comment: true, Tags: true },
    });
  }

  getUserLikedJokes(userId: number) {
    return this.prisma.joke.findMany({
      where: { Like: { some: { userId } } },
      include: {
        Category: true,
        Like: true,
        Comment: true,
        Tags: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.joke.findMany({
      include: { Category: true, Like: true, Comment: true, Tags: true },
    });
  }

  findOne(id: number) {
    return this.prisma.joke.findUnique({
      where: { id },
      include: { Category: true, Like: true, Comment: true, Tags: true },
    });
  }

  update(id: number, updateJokeInput: UpdateJokeInput) {
    return this.prisma.joke.update({
      where: { id },
      data: {
        text: updateJokeInput.text,
        updatedAt: new Date().toString(),
      },
      include: { Category: true, Like: true, Comment: true, Tags: true },
    });
  }

  remove(id: number) {
    return this.prisma.joke.delete({ where: { id } });
  }
}
