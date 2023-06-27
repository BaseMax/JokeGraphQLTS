import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JokeService } from './joke.service';
import { Joke } from './entities/joke.entity';
import { CreateJokeInput } from './dto/create-joke.input';
import { UpdateJokeInput } from './dto/update-joke.input';

@Resolver(() => Joke)
export class JokeResolver {
  constructor(private readonly jokeService: JokeService) {}

  @Mutation(() => Joke)
  createJoke(@Args('createJokeInput') createJokeInput: CreateJokeInput) {
    return this.jokeService.create(createJokeInput);
  }

  @Query(() => [Joke], { name: 'getAllJokes' })
  findAll() {
    return this.jokeService.findAll();
  }

  @Query(() => [Joke], { name: 'searchJokes' })
  searchJokes(@Args('query', { type: () => String }) query: string) {
    return this.jokeService.search(query);
  }

  @Query(() => Joke, { name: 'getRandomJoke' })
  getRandomJoke() {
    return this.jokeService.getRandomJoke();
  }

  @Query(() => Joke, { name: 'getJokeById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.jokeService.findOne(id);
  }

  @Mutation(() => Joke)
  updateJoke(@Args('updateJokeInput') updateJokeInput: UpdateJokeInput) {
    return this.jokeService.update(updateJokeInput.id, updateJokeInput);
  }

  @Mutation(() => Joke)
  removeJoke(@Args('id', { type: () => Int }) id: number) {
    return this.jokeService.remove(id);
  }
}
