import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}
