import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetGenreArgs {
  @Field(() => ID)
  id: string;
}
