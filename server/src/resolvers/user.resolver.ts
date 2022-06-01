import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../entity/User";
import { AuthResponse } from "../utils/responses";
import { LoginInput, RegisterInput } from "../utils/inputs";
import { hash, compare } from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/token";
import { IContext } from "../utils/types/Context";

@Resolver()
export class UserResolver {
  @Query(() => String)
  wussup() {
    return "what's happening !";
  }

  @Mutation(() => AuthResponse)
  async register(@Arg("data") data: RegisterInput, @Ctx() ctx: IContext): Promise<AuthResponse> {
    if (!data.username || !data.password) {
      return {
        status: false,
        message: "Invalid Data !",
      };
    }
    try {
      const user = new User();
      user.username = data.username;
      user.password = await hash(data.password, 5);
      await user.save();
      ctx.res.cookie("uid", generateRefreshToken(user), {
        httpOnly: true,
      });
      return {
        status: true,
        message: "User registered successfuly !",
        token: generateAccessToken(user)
      };
    } catch (e) {
      console.log("something went wrong while registring new user : ", e);
      return {
        status: false,
        message: "Something went wrong !",
      };
    }
  }

  @Mutation(() => AuthResponse)
  async login(
    @Arg("data") data: LoginInput,
    @Ctx() ctx: IContext
  ): Promise<AuthResponse> {
    if (!data.username || !data.password) {
      return {
        status: false,
        message: "Invalid Data !",
      };
    }

    try {
      const user = await User.findOne({ where: { username: data.username } });
      if (!user) {
        return {
          status: false,
          message: "User not found !",
        };
      }
      const valid = await compare(data.password, user.password);
      if (!valid) {
        return {
          status: false,
          message: "Invalid Password",
        };
      }
      // login successfuly !
      ctx.res.cookie("uid", generateRefreshToken(user), {
        httpOnly: true,
      });
      return {
        status: true,
        message: "Login Successfuly !",
        token: generateAccessToken(user),
      };
    } catch (e) {
      console.log("something went wrong : ", e);
      return {
        status: false,
        message: "Something Went Wrong !",
      };
    }
  }
}
