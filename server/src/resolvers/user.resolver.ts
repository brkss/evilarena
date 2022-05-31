import {  Resolver, Query } from 'type-graphql'


@Resolver()
export class UserResolver { 

  @Query(() => String)
  wussup(){
    return "what's happening !"
  }

}
