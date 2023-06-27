import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String, { description: 'email or username' })
  emailOrUsername: string;

  @Field(() => String)
  password: string;
}
