import { ArgsType, Field, ID, ResolveField } from '@nestjs/graphql';

@ArgsType()
export class GetUserArgs {
  @Field(() => ID)
  id: string;
}
