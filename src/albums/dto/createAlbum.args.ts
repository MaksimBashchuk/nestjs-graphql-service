import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateAlbumArgs {
  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  released?: number;

  @Field(() => [String], { nullable: 'itemsAndList' })
  artistsIds?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  bandsIds?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  trackIds?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  genresIds?: string[];
}
