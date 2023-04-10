import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateArtistArgs {
  @Field()
  firstName: string;

  @Field()
  secondName: string;

  @Field({ nullable: true })
  middleName?: string;

  @Field({ nullable: true })
  birthDate?: string;

  @Field({ nullable: true })
  birthPlace?: string;

  @Field()
  country: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  bands?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  instruments?: string[];
}
