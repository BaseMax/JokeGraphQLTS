import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLikeInput {
  @Field(() => Int)
  jokeId: number;
}
