import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReportService } from './report.service';
import { Report } from './entities/report.entity';
import { CreateReportInput } from './dto/create-report.input';
import { GetCurrentUserId, Roles } from 'src/common/decorators';
import { Role } from '../auth/types/role.enum';

@Resolver(() => Report)
export class ReportResolver {
  constructor(private readonly reportService: ReportService) {}

  @Mutation(() => Report)
  createReport(
    @Args('createReportInput') createReportInput: CreateReportInput,
    @GetCurrentUserId() userId: number,
  ) {
    return this.reportService.create(+userId, createReportInput);
  }

  @Roles(Role.Admin)
  @Query(() => [Report], { name: 'reports' })
  findAll() {
    return this.reportService.findAll();
  }

  @Roles(Role.Admin)
  @Query(() => Report, { name: 'report' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reportService.findOne(id);
  }

  @Roles(Role.Admin)
  @Mutation(() => Report)
  removeReport(@Args('id', { type: () => Int }) id: number) {
    return this.reportService.remove(id);
  }
}
