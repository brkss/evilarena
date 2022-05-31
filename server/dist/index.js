"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const resolvers_1 = require("./resolvers");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
(async () => {
    const app = (0, express_1.default)();
    app.get("/", (_, res) => {
        res.send("hello world!");
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [resolvers_1.UserResolver],
        }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log("🚀 server running : http://localhost:4000");
    });
})();
//# sourceMappingURL=index.js.map