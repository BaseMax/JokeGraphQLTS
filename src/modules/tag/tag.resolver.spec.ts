import { Test, TestingModule } from '@nestjs/testing';
import { TagResolver } from './tag.resolver';
import { TagService } from './tag.service';

describe('TagResolver', () => {
  let resolver: TagResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagResolver, TagService],
    }).compile();

    resolver = module.get<TagResolver>(TagResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
