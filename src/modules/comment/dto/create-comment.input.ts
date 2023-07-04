import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  text: string;

  @Field(() => Int)
  jokeId: number;
}
