import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Role } from '../../auth/types/role.enum';

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

  @Field(() => Role)
  role: Role;
}

registerEnumType(Role, {
  name: 'Role',
});
