import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Joke } from 'src/modules/joke/entities/joke.entity';

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => Joke, { nullable: true })
  joke: [Joke];

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
