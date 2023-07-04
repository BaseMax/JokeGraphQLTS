import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SharedModules } from './modules/shared/shared.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { JokeModule } from './modules/joke/joke.module';
import { CategoryModule } from './modules/category/category.module';
import { RatingModule } from './modules/rating/rating.module';
import { GqlAuthGuard } from './modules/auth/guards/at.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/auth/guards/role.guard';
import { CommentModule } from './modules/comment/comment.module';
import { LikeModule } from './modules/like/like.module';
import { ReportModule } from './modules/report/report.module';
import { TagModule } from './modules/tag/tag.module';
import { join } from 'path';
import { UploadModule } from './modules/upload/upload.module';
import { ActivityModule } from './modules/activity/activity.module';

@Module({
  imports: [
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/graphql',
        },
      },
    }),
    SharedModules,
    PrismaModule,
    UserModule,
    JokeModule,
    CategoryModule,
    RatingModule,
    CommentModule,
    LikeModule,
    ReportModule,
    TagModule,
    UploadModule,
    ActivityModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
