import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetBandArgs {
  @Field(() => ID)
  id: string;
}
