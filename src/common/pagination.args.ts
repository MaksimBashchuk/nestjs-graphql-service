import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 5 })
  limit: number;

  @Field(() => Int, { defaultValue: 0 })
  offset: number;
}
