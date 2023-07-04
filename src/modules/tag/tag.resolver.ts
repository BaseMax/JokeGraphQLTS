import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TagService } from './tag.service';
import { Tag } from './entities/tag.entity';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { Public, Roles } from '../../common/decorators';
import { Role } from '../auth/types/role.enum';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Roles(Role.Admin)
  @Mutation(() => Tag, { name: 'createTag' })
  createTag(@Args('createTagInput') createTagInput: CreateTagInput) {
    return this.tagService.create(createTagInput);
  }

  @Public()
  @Mutation(() => [Tag])
  getPopularTags() {
    return this.tagService.getPopularTags();
  }

  @Roles(Role.Admin)
  @Mutation(() => Tag)
  addTagToJoke(
    @Args('jokeId', { type: () => Int }) jokeId: number,
    @Args('tagId', { type: () => Int }) tagId: number,
  ) {
    return this.tagService.addTagToJoke(jokeId, tagId);
  }

  @Roles(Role.Admin)
  @Mutation(() => Tag)
  removeTagFromJoke(
    @Args('jokeId', { type: () => Int }) jokeId: number,
    @Args('tagId', { type: () => Int }) tagId: number,
  ) {
    return this.tagService.removeTagFromJoke(jokeId, tagId);
  }

  @Public()
  @Query(() => [Tag], { name: 'tag' })
  findAll() {
    return this.tagService.findAll();
  }

  @Public()
  @Query(() => Tag, { name: 'tag' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tagService.findOne(id);
  }

  @Roles(Role.Admin)
  @Mutation(() => Tag)
  updateTag(@Args('updateTagInput') updateTagInput: UpdateTagInput) {
    return this.tagService.update(updateTagInput.id, updateTagInput);
  }

  @Roles(Role.Admin)
  @Mutation(() => Tag)
  removeTag(@Args('id', { type: () => Int }) id: number) {
    return this.tagService.remove(id);
  }
}
