import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetAuthTokenArgs {
  @Field()
  email: string;

  @Field()
  password: string;
}
