import { Field, InputType } from '@nestjs/graphql';

@InputType()
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

@InputType()
export class LoginUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
