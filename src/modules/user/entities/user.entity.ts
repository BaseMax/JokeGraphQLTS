import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Role } from '../../auth/types/role.enum';
import { UserProfile } from './userProfile.entity';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'Example field (1)' })
  id: number;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => UserProfile, { nullable: true })
  profile: UserProfile;

  @Field(() => Role)
  role: Role;
}

registerEnumType(Role, {
  name: 'Role',
});
