import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { UserResolver, ChannelResolver } from "./resolvers";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import { refreshToken } from "./utils/token";
import cors from "cors";

(async () => {
  await createConnection({
    host: "localhost",
    type: "mysql",
    port: 3306,
    username: "root",
    password: "root",
    database: "evilarena",
    entities: ["dist/entity/*.js"],
    migrations: ["dist/entity/migrations/*.js"],
    synchronize: true,
  });

  const app = express();
  app.use(cookieParser());
  app.use(
    cors({
      //origin: "*",
      //origin: ["*", "http://localhost:3000]"],
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.get("/", (_, res) => {
    res.send("hello world!");
  });

  app.post("/refresh_token", async (req, res) => await refreshToken(req, res));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, ChannelResolver],
      validate: true,
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("🚀 server running : http://localhost:4000");
  });
})();
