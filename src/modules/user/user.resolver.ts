import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { GetCurrentUserId, Roles } from 'src/common/decorators';
import { UserProfile } from './entities/userProfile.entity';
import { Role } from '../auth/types/role.enum';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserProfile)
  updateUserProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
    @GetCurrentUserId() userId: number,
  ) {
    return this.userService.updateUserProfile(+userId, updateProfileInput);
  }

  @Roles(Role.Admin)
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Roles(Role.Admin)
  @Query(() => [User], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

  @Roles(Role.Admin)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Roles(Role.Admin)
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Roles(Role.Admin)
  @Mutation(() => User)
  deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
