import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReportInput } from './dto/create-report.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}
  async create(userId: number, createReportInput: CreateReportInput) {
    await this.checkUserReportedThisJoke(userId, createReportInput.jokeId);

    return this.prisma.report.create({
      data: {
        reason: createReportInput.reason,
        joke: { connect: { id: createReportInput.jokeId } },
        user: { connect: { id: userId } },
      },
      include: {
        joke: true,
        user: true,
      },
    });
  }

  private async checkUserReportedThisJoke(
    userId: number,
    jokeId: number,
  ): Promise<void> {
    const report = this.prisma.report.findFirst({
      where: { AND: [{ userId }, { jokeId }] },
    });

    if (report)
      throw new BadRequestException('You have already reported on this joke');
  }

  findAll() {
    return this.prisma.report.findMany({});
  }

  findOne(id: number) {
    return this.prisma.report.findUnique({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.report.delete({ where: { id } });
  }
}
