import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateTagInput {
  @Field(() => String)
  @IsString()
  name: string;
}
