import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { CreateLikeInput } from './dto/create-like.input';
import { GetCurrentUserId } from 'src/common/decorators';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Mutation(() => Like)
  likeJoke(
    @Args('createLikeInput') createLikeInput: CreateLikeInput,
    @GetCurrentUserId() userId: number,
  ) {
    return this.likeService.likeJoke(+userId, createLikeInput);
  }
}
