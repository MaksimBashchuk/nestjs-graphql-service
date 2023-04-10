import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Favourites {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'bands' })
  bandsIds?: string[];

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'genres' })
  genresIds?: string[];

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'artists' })
  artistsIds?: string[];

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'tracks' })
  tracksIds?: string[];
}
