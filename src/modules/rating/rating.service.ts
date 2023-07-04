import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRatingInput } from './dto/create-rating.input';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ActivityService } from '../activity/activity.service';
import { ActivityType } from '../activity/types/activity.enum';

@Injectable()
export class RatingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activateService: ActivityService,
    ) {}

  async create(userId: number, createRatingInput: CreateRatingInput) {
    await this.checkRatingExistsInUser(userId, createRatingInput.jokeId);

    return await this.updateJokeRateAndSave(
      createRatingInput.score,
      userId,
      createRatingInput.jokeId,
    );
  }

  findAll() {
    return this.prisma.rating.findMany({ include: { user: true, joke: true } });
  }

  findOne(id: number) {
    this.prisma.rating.findUnique({
      where: { id },
      include: { user: true, joke: true },
    });
  }

  private async checkRatingExistsInUser(
    userId: number,
    jokeId: number,
  ): Promise<void> {
    const rating = await this.prisma.rating.findFirst({
      where: {
        AND: [{ jokeId }, { userId }],
      },
    });
    if (rating) throw new BadRequestException('You already rated this joke');
  }

  private async updateJokeRateAndSave(
    score: number,
    userId: number,
    jokeId: number,
  ) {
    return this.prisma.$transaction(async (ctx) => {
      const rate = await ctx.rating.create({
        data: {
          score,
          joke: { connect: { id: jokeId } },
          user: { connect: { id: userId } },
        },
        include: { joke: true, user: true },
      });
      await this.calculationRateAndUpdateJoke(ctx, jokeId);
      await this.activateService.create({
        type: ActivityType.Rating,
        jokeId: rate.jokeId,
        userId: rate.userId,
      });

      return rate;
    });
  }

  private async calculationRateAndUpdateJoke(
    ctx: Prisma.TransactionClient,
    jokeId: number,
  ) {
    const scores = await ctx.rating.findMany({ where: { jokeId } });

    const totalScore = scores.reduce((sum, rating) => sum + rating.score, 0);
    const jokeRate = totalScore / scores.length;

    await ctx.joke.update({
      where: { id: jokeId },
      data: {
        rate: jokeRate,
        updatedAt: new Date().toISOString(),
      },
    });
  }
}
