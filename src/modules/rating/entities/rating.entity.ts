import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Joke } from 'src/modules/joke/entities/joke.entity';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class Rating {
  @Field(() => Int)
  id: number;

  @Field(() => Float)
  score: number;

  @Field(() => Joke)
  joke: Joke;

  @Field(() => User)
  user: User;

  @Field(() => Date)
  createdAt: Date;
}
