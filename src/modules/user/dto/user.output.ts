import { Field, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongodb';

@ObjectType('User')
export class GqlUser {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  fullName: string;
}

@ObjectType('UserWithToken')
export class GqlUserWithToken extends GqlUser {
  @Field(() => String)
  token: string;
}

@ObjectType('MUser')
export class MGqlUser {
  @Field(() => Number)
  id: number;

  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;

  @Field(() => String, { nullable: true })
  calenderColor: string;
}

export const mUserConverter = (user: Document): MGqlUser => ({
  firstName: user?.firstName,
  id: user._id.toString(),
  lastName: user?.lastName,
  calenderColor: user?.calenderColor,
});
