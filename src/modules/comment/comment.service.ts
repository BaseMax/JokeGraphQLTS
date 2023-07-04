import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { PrismaService } from '../prisma/prisma.service';
import { ActivityService } from '../activity/activity.service';
import { ActivityType } from '../activity/types/activity.enum';

@Injectable()
export class CommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityService: ActivityService,
  ) {}

  async create(userId: number, createCommentInput: CreateCommentInput) {
    const comment = await this.prisma.comment.create({
      data: {
        text: createCommentInput.text,
        user: { connect: { id: userId } },
        Joke: { connect: { id: createCommentInput.jokeId } },
      },
      include: { Joke: true, user: true },
    });
    await this.activityService.create({
      type: ActivityType.Comment,
      commentId: comment.id,
      jokeId: comment.jokeId,
      userId: comment.userId,
    });

    return comment;
  }

  activateComment(id: number) {
    return this.prisma.comment.update({
      where: { id },
      data: {
        active: true,
      },
      include: { Joke: true, user: true },
    });
  }

  async deactivateComment(id: number) {
    await this.checkCommentExists(+id);

    return this.prisma.comment.update({
      where: { id },
      data: {
        active: false,
      },
      include: { Joke: true, user: true },
    });
  }

  private async checkCommentExists(id: number): Promise<void> {
    const comment = this.prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new BadRequestException('Comment not found!');
  }

  getCommentsByJokeId(jokeId: number) {
    return this.prisma.comment.findMany({
      where: {
        Joke: { id: jokeId },
        active: true,
      },
      include: { Joke: true },
    });
  }

  findAllDeactiveComments() {
    return this.prisma.comment.findMany({
      where: {
        active: false,
      },
    });
  }

  remove(id: number) {
    return this.prisma.comment.delete({ where: { id } });
  }
}
