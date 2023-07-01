import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Joke } from 'src/modules/joke/entities/joke.entity';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class Like {
  @Field(() => Int)
  id: number;

  @Field(() => Joke)
  joke: Joke;

  @Field(() => User)
  user: User;
}
