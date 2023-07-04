import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { ActivityType } from '../types/activity.enum';

@InputType()
export class CreateActivityInput {
  @Field(() => ActivityType)
  type: ActivityType;

  @Field(() => Int, { nullable: true })
  jokeId?: number;

  @Field(() => Int, { nullable: true })
  commentId?: number;

  @Field(() => Int, { nullable: true })
  userId?: number;
}

registerEnumType(ActivityType, { name: 'ActivityType' });
