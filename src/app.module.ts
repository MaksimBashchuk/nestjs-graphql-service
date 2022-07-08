import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseDataInterceptor } from './utils/transformResponseData.interceptor';
import { setAuthHeaderInterceptor } from './utils/setAuthHeaderInterceptor';
import { HttpModule } from '@nestjs/axios';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseDataInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: setAuthHeaderInterceptor,
    },
  ],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    HttpModule,
    UsersModule,
  ],
})
export class AppModule {}
