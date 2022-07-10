import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Band {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  origin?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  members?: string[];

  @Field({ nullable: true })
  website?: string;

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'genres' })
  genresIds?: string[];
}
