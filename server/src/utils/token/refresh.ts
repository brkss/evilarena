import { verify } from "jsonwebtoken";
import { User } from "../../entity/User";
import { Response, Request } from "express";
import {generateAccessToken, generateRefreshToken} from ".";

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.uid;
  if (!token) {
    res.send({
      status: false,
      token: "",
    });
  }
 
  let payload : any = null; 
  try {
    payload = verify(token, process.env.REFRESH_SECRET!);
  }catch(e){
    console.log("Invald Token =>>> ", e);
    return res.send({
      token: "",
      status: false
    });
  }
  if(!payload){
    return res.send({
      status: false,
      token: ""
    });
  }
  const user = await User.findOne({where: {id: payload.userId}})
  if(!user){
    return res.send({
      token: "",
      status: false
    });
  }
  const rt = generateAccessToken(user);

  res.cookie('uid', generateRefreshToken(user), {
    httpOnly: true
  });
  return res.send({
    token: rt,
    status: true
  })

};
