import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Track {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field()
  title: string;

  // @Field(() => [ID], { nullable: 'itemsAndList', name: 'album' })
  // albumId: string;

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'artists' })
  artistsIds: string[];

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'bands' })
  bandsIds: string[];

  @Field(() => Int)
  duration: number;

  @Field(() => Int)
  released: number;

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'genres' })
  genresIds: string[];
}
