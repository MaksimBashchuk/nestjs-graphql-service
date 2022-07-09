import { join } from 'path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';

import { setAuthHeaderInterceptor } from './utils/setAuthHeaderInterceptor';
import { TransformResponseDataInterceptor } from './utils/transformResponseData.interceptor';

import { UsersModule } from './users/users.module';
import { GenresModule } from './genres/genres.module';
import { ArtistsModule } from './artists/artists.module';

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
    GenresModule,
    ArtistsModule,
  ],
})
export class AppModule {}
