import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { JokeService } from './joke.service';
import { Joke } from './entities/joke.entity';
import { CreateJokeInput } from './dto/create-joke.input';
import { UpdateJokeInput } from './dto/update-joke.input';
import { PubSub } from 'graphql-subscriptions';
import { GetCurrentUserId, Public, Roles } from '../../common/decorators';
import { Role } from '../auth/types/role.enum';

@Resolver(() => Joke)
export class JokeResolver {
  private readonly pubSub: PubSub;
  constructor(private readonly jokeService: JokeService) {
    this.pubSub = new PubSub();
  }

  @Public()
  @Subscription(() => Joke)
  jokeAdded() {
    return this.pubSub.asyncIterator('jokeAdded');
  }

  @Roles(Role.Admin)
  @Mutation(() => Joke, { name: 'addJoke' })
  async createJoke(@Args('createJokeInput') createJokeInput: CreateJokeInput) {
    const newJoke = await this.jokeService.create(createJokeInput);
    this.pubSub.publish('jokeAdded', { jokeAdded: newJoke });
    return newJoke;
  }

  @Public()
  @Query(() => [Joke], { name: 'getAllJokes' })
  findAll() {
    return this.jokeService.findAll();
  }

  @Public()
  @Query(() => [Joke], { name: 'searchJokes' })
  searchJokes(@Args('query', { type: () => String }) query: string) {
    return this.jokeService.search(query);
  }

  @Public()
  @Query(() => [Joke])
  getJokesByFilter(@Args('categoryId', { type: () => Int }) id: number) {
    return this.jokeService.getJokesByFilter(+id);
  }

  @Public()
  @Query(() => [Joke])
  getHotJokes() {
    return this.jokeService.getHotJokes();
  }

  @Public()
  @Query(() => [Joke], { name: 'getTopJokes' })
  getTopJokes() {
    return this.jokeService.getTopJokes();
  }

  @Public()
  @Query(() => Joke, { name: 'getRandomJoke' })
  getRandomJoke() {
    return this.jokeService.getRandomJoke();
  }

  @Public()
  @Query(() => Joke, { name: 'getJokeById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.jokeService.findOne(id);
  }

  @Query(() => [Joke])
  getUserLikedJokes(@GetCurrentUserId() userId: number) {
    return this.jokeService.getUserLikedJokes(+userId);
  }

  @Roles(Role.Admin)
  @Mutation(() => Joke, { name: 'editJoke' })
  updateJoke(@Args('updateJokeInput') updateJokeInput: UpdateJokeInput) {
    return this.jokeService.update(updateJokeInput.id, updateJokeInput);
  }

  @Roles(Role.Admin)
  @Mutation(() => Joke, { name: 'deleteJoke' })
  removeJoke(@Args('id', { type: () => Int }) id: number) {
    return this.jokeService.remove(id);
  }
}
