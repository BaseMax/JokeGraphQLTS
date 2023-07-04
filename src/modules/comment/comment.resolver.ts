import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { GetCurrentUserId, Roles } from 'src/common/decorators';
import { Role } from '../auth/types/role.enum';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment, { name: 'addComment' })
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @GetCurrentUserId() userId: number,
  ) {
    return this.commentService.create(+userId, createCommentInput);
  }

  @Roles(Role.Admin)
  @Mutation(() => Comment)
  activateComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.activateComment(+id);
  }

  @Roles(Role.Admin)
  @Mutation(() => Comment)
  deactivateComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.deactivateComment(+id);
  }

  @Query(() => [Comment], { name: 'getCommentsByJoke' })
  getCommentsByJoke(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.getCommentsByJokeId(+id);
  }

  @Roles(Role.Admin)
  @Query(() => [Comment], { name: 'comment' })
  findAllDeactiveComments() {
    return this.commentService.findAllDeactiveComments();
  }

  @Roles(Role.Admin)
  @Mutation(() => Comment)
  removeComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.remove(id);
  }
}
