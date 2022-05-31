import "reflect-metadata";
import express from "express";
import { UserResolver } from "./resolvers";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

(async () => {
  const app = express();

  app.get("/", (_, res) => {
    res.send("hello world!");
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("🚀 server running : http://localhost:4000");
  });
})();
