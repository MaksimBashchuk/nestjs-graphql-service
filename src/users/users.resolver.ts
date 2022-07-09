import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { JWT, User } from './user.entity';
import { UsersService } from './users.service';
import { GetAuthTokenArgs } from './dto/getAuthToken.args';
import { RegisterUserArgs } from './dto/registerUser.args';
import { GetUserArgs } from './dto/getUser.args';

import { AUTH } from './constants';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  user(@Args() { id }: GetUserArgs): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Query(() => JWT)
  async jwt(@Args() { email, password }: GetAuthTokenArgs): Promise<JWT> {
    const token = await this.usersService.getAuthToken(email, password);
    AUTH.TOKEN = token.jwt;
    return token;
  }

  @Mutation(() => User)
  async register(
    @Args() { email, password, firstName, lastName }: RegisterUserArgs,
  ): Promise<User> {
    return this.usersService.registerUser(firstName, lastName, password, email);
  }
}
