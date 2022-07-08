import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  secondName?: string;

  @Field({ nullable: true })
  middleName?: string;

  @Field()
  password: string;

  @Field()
  email: string;
}

@ObjectType()
export class JWT {
  @Field()
  jwt: string;
}
