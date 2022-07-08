import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class RegisterUserArgs {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
