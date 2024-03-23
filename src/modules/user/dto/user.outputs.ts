import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class GqlUser {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  fullName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  gender: string;
}

@ObjectType('User')
export class GqlUserWithToken extends GqlUser {
  @Field(() => String)
  token: string;
}
