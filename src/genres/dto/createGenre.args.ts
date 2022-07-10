import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateGenreArgs {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  country?: string;

  @Field(() => Int, { nullable: true })
  year?: number;
}
