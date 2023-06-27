import { Test, TestingModule } from '@nestjs/testing';
import { JokeService } from './joke.service';

describe('JockService', () => {
  let service: JokeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JokeService],
    }).compile();

    service = module.get<JokeService>(JokeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
