import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetTrackArgs {
  @Field(() => ID)
  id: string;
}
