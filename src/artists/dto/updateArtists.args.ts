import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateArtistArgs {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  secondName?: string;

  @Field({ nullable: true })
  middleName?: string;

  @Field({ nullable: true })
  birthDate?: string;

  @Field({ nullable: true })
  birthPlace?: string;

  @Field({ nullable: true })
  country?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  bands?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  instruments?: string[];
}
