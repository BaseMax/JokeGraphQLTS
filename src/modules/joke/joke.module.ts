import { Module } from '@nestjs/common';
import { JokeService } from './joke.service';
import { JokeResolver } from './joke.resolver';

@Module({
  providers: [JokeResolver, JokeService],
})
export class JokeModule {}
