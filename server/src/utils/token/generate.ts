import { sign } from "jsonwebtoken";
import { User } from "../../entity";

export const generateAccessToken = (user: User) => {
  const token = sign(
    {
      userId: user.id,
    },
    process.env.ACCESS_SECRET!,
    {
      expiresIn: "15m",
    }
  );

  return token;
};

export const generateRefreshToken = (user: User) => {
  
  const token = sign({
    userId: user.id,
  }, process.env.REFRESH_SECRET!, {expiresIn: '7d'});
  return token;
}
