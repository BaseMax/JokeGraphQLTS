import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Joke } from 'src/modules/joke/entities/joke.entity';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => Joke, { name: 'joke' })
  Joke: Joke;

  @Field(() => User)
  user: User;

  @Field(() => Date)
  createdAt: Date;
}
