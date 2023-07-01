import { Injectable } from '@nestjs/common';
import { CreateLikeInput } from './dto/create-like.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async likeJoke(userId: number, createLikeInput: CreateLikeInput) {
    const likeExists = await this.checkLikeExistsinUser(
      userId,
      createLikeInput.jokeId,
    );
    return await this.updateJokeLikesAndSave(
      userId,
      createLikeInput.jokeId,
      likeExists.exists,
      likeExists.id,
    );
  }

  private async checkLikeExistsinUser(
    userId: number,
    jokeId: number,
  ): Promise<{ exists: boolean; id: number }> {
    const like = await this.prisma.like.findFirst({
      where: { AND: { userId, jokeId } },
    });
    if (like) return { exists: true, id: like.id };

    return { exists: false, id: null };
  }

  private async updateJokeLikesAndSave(
    userId: number,
    jokeId: number,
    likeExists: boolean,
    likeId: number,
  ) {
    return await this.prisma.$transaction(async (ctx) => {
      let updatedLike: number;
      let like;
      const joke = await ctx.joke.findUnique({ where: { id: jokeId } });

      if (likeExists && likeId) {
        like = await ctx.like.delete({
          where: { id: likeId },
          include: { joke: true, user: true },
        });

        updatedLike = joke.likes - 1;
      } else {
        like = await ctx.like.create({
          data: {
            joke: { connect: { id: jokeId } },
            user: { connect: { id: userId } },
          },
          include: {
            joke: true,
            user: true,
          },
        });

        updatedLike = joke.likes + 1;
      }

      await ctx.joke.update({
        where: { id: jokeId },
        data: {
          likes: updatedLike,
        },
      });

      return like;
    });
  }
}
