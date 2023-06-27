import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SharedModules } from './modules/shared/shared.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { JokeModule } from './modules/joke/joke.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    SharedModules,
    PrismaModule,
    UserModule,
    AuthModule,
    JokeModule,
    CategoryModule,
  ],
})
export class AppModule {}
