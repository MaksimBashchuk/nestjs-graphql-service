import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Track {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field()
  title: string;

  @Field(() => ID, { nullable: true, name: 'album' })
  albumId?: string;

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'artists' })
  artistsIds?: string[];

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'bands' })
  bandsIds?: string[];

  @Field(() => Int, { nullable: true })
  duration?: number;

  @Field(() => Int, { nullable: true })
  released?: number;

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'genres' })
  genresIds?: string[];
}
