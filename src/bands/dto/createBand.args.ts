import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class CreateBandArgs {
  @Field()
  name: string;

  @Field({ nullable: true })
  origin?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  members?: string[];

  @Field({ nullable: true })
  website?: string;

  @Field(() => [ID], { nullable: 'itemsAndList' })
  genresIds?: string[];
}
