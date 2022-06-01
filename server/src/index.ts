import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { UserResolver } from "./resolvers";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

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

  app.get("/", (_, res) => {
    res.send("hello world!");
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("🚀 server running : http://localhost:4000");
  });
})();
