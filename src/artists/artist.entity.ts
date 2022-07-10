import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Band } from '../bands/band.entity';

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

  @Field(() => [Band], { nullable: 'itemsAndList', name: 'bands' })
  bandsIds?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  instruments?: string[];
}
