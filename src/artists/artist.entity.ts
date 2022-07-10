import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Artist {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  secondName?: string;

  @Field({ nullable: true })
  middleName?: string;

  @Field(() => Date, { nullable: true })
  birthDate?: string;

  @Field({ nullable: true })
  birthPlace?: string;

  @Field({ nullable: true })
  country?: string;

  // replace it with band type
  @Field(() => [String], { nullable: 'items' })
  bands: string[];

  @Field(() => [String], { nullable: 'items' })
  instruments: string[];
}
