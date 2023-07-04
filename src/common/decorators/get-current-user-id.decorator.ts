import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const gql = GqlExecutionContext.create(context).getContext();
    const user = gql.req.user;
    return user?.id ? user.id : 0;
  },
);
