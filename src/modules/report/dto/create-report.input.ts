import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateReportInput {
  @Field(() => Int)
  jokeId: number;

  @Field(() => String)
  reason: string;
}
