import { MiddlewareFn } from 'type-graphql';
import { IContext } from '../types/Context'; 
import { verify } from 'jsonwebtoken'; 

export const isUserAuth : MiddlewareFn<IContext> = ({context}, next) => {


  const authorization = context.req.headers['authorization'];
  if(!authorization){
    throw new Error('Not Authenticated !');
  }

  const token = authorization.split(' ')[1];
  if(!token){
    throw new Error("Bad Token !");
  }

  try {
    const payload = verify(token, process.env.ACCESS_SECRET!);
    context.payload = payload;
  } catch(e){
    throw new Error('Invalid Token !');
  }

  return next();


}
