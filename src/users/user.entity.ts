import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true, name: 'secondName' })
  lastName?: string;

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
