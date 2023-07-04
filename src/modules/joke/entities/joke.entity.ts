import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Category } from 'src/modules/category/entities/category.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Like } from '../../like/entities/like.entity';

@ObjectType()
export class Joke {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => Int)
  likes: number;

  @Field(() => Float)
  rate: number;

  @Field(() => Category, { name: 'category', nullable: true })
  Category: Category;

  @Field(() => [Tag], { name: 'tag', nullable: true })
  Tags: [Tag];

  @Field(() => [Comment], { name: 'comment', nullable: true })
  Comment: [Comment];

  @Field(() => [Like], { name: 'like', nullable: true })
  Like: [Like];

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
