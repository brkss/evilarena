"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const resolvers_1 = require("./resolvers");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const token_1 = require("./utils/token");
const cors_1 = __importDefault(require("cors"));
(async () => {
    await (0, typeorm_1.createConnection)({
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
    const app = (0, express_1.default)();
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.get("/", (_, res) => {
        res.send("hello world!");
    });
    app.post("/refresh_token", async (req, res) => await (0, token_1.refreshToken)(req, res));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [resolvers_1.UserResolver, resolvers_1.ChannelResolver],
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
//# sourceMappingURL=index.js.map