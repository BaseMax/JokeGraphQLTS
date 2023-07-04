import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTagInput: CreateTagInput) {
    await this.checkTagExists(createTagInput.name);

    return this.prisma.tag.create({
      data: {
        name: createTagInput.name,
      },
    });
  }

  addTagToJoke(jokeId: number, tagId: number) {
    return this.prisma.tag.update({
      where: { id: tagId },
      data: {
        Joke: { connect: { id: jokeId } },
      },
      include: { Joke: true },
    });
  }

  removeTagFromJoke(jokeId: number, tagId: number) {
    return this.prisma.tag.update({
      where: { id: tagId },
      data: {
        Joke: { disconnect: { id: jokeId } },
      },
      include: { Joke: true },
    });
  }

  getPopularTags() {
    return this.prisma.tag.findMany({
      include: { Joke: true },
      orderBy: {
        Joke: {
          _count: 'desc',
        },
      },
    });
  }

  private async checkTagExists(name: string): Promise<void> {
    const tag = await this.prisma.tag.findFirst({
      where: {
        name: {
          contains: name,
        },
      },
    });
    if (tag) throw new BadRequestException('tag already exists!');
  }

  findAll() {
    return this.prisma.tag.findMany({ include: { Joke: true } });
  }

  findOne(id: number) {
    return this.prisma.tag.findUnique({
      where: { id },
      include: { Joke: true },
    });
  }

  update(id: number, updateTagInput: UpdateTagInput) {
    return this.prisma.tag.update({
      where: { id },
      data: updateTagInput,
      include: { Joke: true },
    });
  }

  remove(id: number) {
    return this.prisma.tag.delete({ where: { id } });
  }
}
