import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Album {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  released?: number;

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'artists' })
  artistsIds?: string[];

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'bands' })
  bandsIds?: string[];

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'tracks' })
  trackIds?: string[];

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'genres' })
  genresIds?: string[];

  @Field({ nullable: true })
  image?: string;
}
