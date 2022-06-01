import { Resolver, Query, Mutation } from 'type-graphql';
import { CreateChannelInput } from '../utils/inputs';


@Resolver()
export class ChannelResolver {

  @Query(() => String)
  helloChannel(){
    return "coco channel !"
  }


}
