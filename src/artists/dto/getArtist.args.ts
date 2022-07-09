import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetArtistArgs {
  @Field(() => ID)
  id: string;
}
