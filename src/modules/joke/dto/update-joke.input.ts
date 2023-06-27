import { CreateJokeInput } from './create-joke.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateJokeInput extends PartialType(CreateJokeInput) {
  @Field(() => Int)
  id: number;
}
