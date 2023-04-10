import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetAlbumArgs {
  @Field(() => ID)
  id: string;
}
