import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RatingService } from './rating.service';
import { Rating } from './entities/rating.entity';
import { CreateRatingInput } from './dto/create-rating.input';
import { GetCurrentUserId } from 'src/common/decorators';

@Resolver(() => Rating)
export class RatingResolver {
  constructor(private readonly ratingService: RatingService) {}

  @Mutation(() => Rating, { name: 'rateJoke' })
  createRating(
    @Args('createRatingInput') createRatingInput: CreateRatingInput,
    @GetCurrentUserId() userId: number,
  ) {
    return this.ratingService.create(+userId, createRatingInput);
  }
}
