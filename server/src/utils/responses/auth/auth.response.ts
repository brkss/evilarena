import { ObjectType, Field } from 'type-graphql';


@ObjectType()
export class AuthResponse {

  @Field()
  status: boolean;

  @Field({nullable: true})
  message?: string;

  @Field({nullable: true})
  token?: string

}
