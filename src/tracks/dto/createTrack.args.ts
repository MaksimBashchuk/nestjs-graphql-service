import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateTrackArgs {
  @Field()
  title: string;

  @Field({ nullable: true })
  albumId?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  bandsIds?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  artistsIds?: string[];

  @Field(() => Int, { nullable: true })
  duration?: number;

  @Field(() => Int, { nullable: true })
  released?: number;

  @Field(() => [String], { nullable: 'itemsAndList' })
  genresIds?: string[];
}
