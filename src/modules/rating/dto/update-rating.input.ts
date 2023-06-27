import { CreateRatingInput } from './create-rating.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRatingInput extends PartialType(CreateRatingInput) {
  @Field(() => Int)
  id: number;
}
