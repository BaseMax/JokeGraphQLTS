import { Injectable } from '@nestjs/common';
import { CreateActivityInput } from './dto/create-activity.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivityService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createActivityInput: CreateActivityInput) {
    const activityData: any = {
      type: createActivityInput.type,
      joke: { connect: { id: createActivityInput.jokeId } },
      user: { connect: { id: createActivityInput.userId } },
    };

    if (createActivityInput.commentId) {
      activityData.comment = { connect: { id: createActivityInput.commentId } };
    }
    return this.prisma.activity.create({
      data: activityData,
    });
  }
}
