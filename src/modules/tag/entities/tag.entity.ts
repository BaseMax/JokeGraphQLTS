import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Joke } from 'src/modules/joke/entities/joke.entity';

@ObjectType()
export class Tag {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [Joke], { name: 'joke', nullable: true })
  Joke: [Joke];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
