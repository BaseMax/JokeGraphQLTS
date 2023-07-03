import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class UserProfile {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => User)
  user: User;

  @Field(() => Date)
  updatedAt: Date;
}
