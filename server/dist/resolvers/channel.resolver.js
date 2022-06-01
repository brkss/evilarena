"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelResolver = void 0;
const type_graphql_1 = require("type-graphql");
const inputs_1 = require("../utils/inputs");
const responses_1 = require("../utils/responses");
const Chanel_1 = require("../entity/Chanel");
const auth_mw_1 = require("../utils/middleware/auth.mw");
const User_1 = require("../entity/User");
let ChannelResolver = class ChannelResolver {
    helloChannel() {
        return "coco channel !";
    }
    async channels(ctx) {
        const user = await User_1.User.findOne({ where: { id: ctx.payload.userId } });
        if (!user) {
            return [];
        }
        const channels = await Chanel_1.Channel.find({ where: { user: user } });
        return channels;
    }
    async createChannel(data, ctx) {
        if (!data || !data.name) {
            return {
                status: false,
                message: "Invalid Data",
            };
        }
        const user = await User_1.User.findOne({ where: { id: ctx.payload.userId } });
        if (!user) {
            return {
                status: true,
                message: "User not found !",
            };
        }
        try {
            const channel = new Chanel_1.Channel();
            channel.name = data.name;
            channel.user = user;
            await channel.save();
            return {
                status: true,
                message: "Channel Created Successfuly !",
                channel: channel,
            };
        }
        catch (e) {
            console.log("Something went wrong : ", e);
            return {
                status: false,
                message: "Something went wrong !",
            };
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChannelResolver.prototype, "helloChannel", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(auth_mw_1.isUserAuth),
    (0, type_graphql_1.Query)(() => [Chanel_1.Channel]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "channels", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(auth_mw_1.isUserAuth),
    (0, type_graphql_1.Mutation)(() => responses_1.CreateChannelResponse),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.CreateChannelInput, Object]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "createChannel", null);
ChannelResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ChannelResolver);
exports.ChannelResolver = ChannelResolver;
//# sourceMappingURL=channel.resolver.js.map