import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateBandArgs {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  origin?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  members?: string[];

  @Field({ nullable: true })
  website?: string;

  @Field(() => [ID], { nullable: 'itemsAndList' })
  genresIds?: string[];
}
