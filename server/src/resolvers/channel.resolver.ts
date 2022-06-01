import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { CreateChannelInput } from "../utils/inputs";
import { CreateChannelResponse } from "../utils/responses";
import { Channel } from "../entity/Chanel";

@Resolver()
export class ChannelResolver {
  @Query(() => String)
  helloChannel() {
    return "coco channel !";
  }

  @Mutation(() => CreateChannelResponse)
  async createChannel(
    @Arg("data") data: CreateChannelInput
  ): Promise<CreateChannelResponse> {
    if (!data || !data.name) {
      return {
        status: false,
        message: "Invalid Data",
      };
    }
    try {
      const channel = new Channel();
      channel.name = data.name;
      await channel.save();
      return {
        status: true,
        message: "Channel Created Successfuly !",
        channel: channel,
      };
    } catch (e) {
      console.log("Something went wrong : ", e);
      return {
        status: false,
        message: "Something went wrong !",
      };
    }
  }
}
