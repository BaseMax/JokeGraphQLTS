import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, Max } from 'class-validator';

@InputType()
export class CreateRatingInput {
  @Field(() => Int, { description: '4' })
  @IsNumber()
  @IsNotEmpty()
  @Max(5, { message: 'max value 5' })
  score: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  jokeId: number;
}
