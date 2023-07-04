import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { ActivityType } from '../types/activity.enum';
import { Joke } from '../../joke/entities/joke.entity';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';

@ObjectType()
export class Activity {
  @Field(() => Int)
  id: number;

  @Field(() => ActivityType)
  type: ActivityType;

  @Field(() => Joke, { nullable: true })
  joke?: Joke;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Comment, { nullable: true })
  comment?: Comment;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

registerEnumType(ActivityType, { name: 'ActivityType' });
