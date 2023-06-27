import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateJokeInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  text: string;

  @Field(() => Int)
  @IsNumber()
  @IsOptional()
  categoryId: number;
}
