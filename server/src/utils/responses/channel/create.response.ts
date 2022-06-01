import { ObjectType, Field } from 'type-graphql'
import { Channel } from '../../../entity/Chanel';

@ObjectType()
export class CreateChannelResponse {

  @Field()
  status: boolean;

  @Field({nullable: true})
  message?: string;

  @Field(() => Channel, {nullable: true})
  channel?: Channel;

}
