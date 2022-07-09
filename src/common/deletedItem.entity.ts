import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DeletedItem {
  @Field(() => Boolean, { nullable: true })
  acknowledged?: boolean;

  @Field(() => Int, { nullable: true })
  deletedCount?: number;
}
