import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class CreateUserInput {
  @Field(() => String)
  fullName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  gender: string;
}
