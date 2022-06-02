import {
  Resolver,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import { CreateChannelInput } from "../utils/inputs";
import { CreateChannelResponse } from "../utils/responses";
import { Channel } from "../entity/Chanel";
import { isUserAuth } from "../utils/middleware/auth.mw";
import { IContext } from "../utils/types/Context";
import { User } from "../entity/User";

@Resolver()
export class ChannelResolver {
  @Query(() => String)
  helloChannel() {
    return "coco channel !";
  }

  @UseMiddleware(isUserAuth)
  @Query(() => Channel, { nullable: true })
  async channel(
    @Arg("cid") cid: string,
    @Ctx() ctx: IContext
  ): Promise<Channel | null> {
    const user = await User.findOne({ where: { id: ctx.payload.userId } });
    if (!user) return null;
    const channel = await Channel.findOne({ where: { user: user, id: cid } });
    if (!channel) return null;
    return channel;
  }

  @UseMiddleware(isUserAuth)
  @Query(() => [Channel])
  async channels(@Ctx() ctx: IContext): Promise<Channel[]> {
    const user = await User.findOne({ where: { id: ctx.payload.userId } });
    if (!user) {
      return [];
    }
    const channels = await Channel.find({ where: { user: user } });
    return channels;
  }

  @UseMiddleware(isUserAuth)
  @Mutation(() => CreateChannelResponse)
  async createChannel(
    @Arg("data") data: CreateChannelInput,
    @Ctx() ctx: IContext
  ): Promise<CreateChannelResponse> {
    if (!data || !data.name) {
      return {
        status: false,
        message: "Invalid Data",
      };
    }
    const user = await User.findOne({ where: { id: ctx.payload.userId } });
    if (!user) {
      return {
        status: true,
        message: "User not found !",
      };
    }
    try {
      const channel = new Channel();
      channel.name = data.name;
      channel.user = user;
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
