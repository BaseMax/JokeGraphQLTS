import { Test, TestingModule } from '@nestjs/testing';
import { JokeResolver } from './joke.resolver';
import { JokeService } from './joke.service';

describe('JokeResolver', () => {
  let resolver: JokeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JokeResolver, JokeService],
    }).compile();

    resolver = module.get<JokeResolver>(JokeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
