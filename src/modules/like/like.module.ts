import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';
import { ActivityModule } from '../activity/activity.module';

@Module({
  imports: [ActivityModule],
  providers: [LikeResolver, LikeService],
})
export class LikeModule {}
