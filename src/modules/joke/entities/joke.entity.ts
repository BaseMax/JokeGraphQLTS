import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Category } from 'src/modules/category/entities/category.entity';

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

  @Field(() => Category, { name: 'category' })
  Category: Category;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
