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
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entity/User");
const responses_1 = require("../utils/responses");
const inputs_1 = require("../utils/inputs");
const bcrypt_1 = require("bcrypt");
let UserResolver = class UserResolver {
    wussup() {
        return "what's happening !";
    }
    async register(data) {
        if (!data.username || !data.password) {
            return {
                status: false,
                message: "Invalid Data !",
            };
        }
        try {
            const user = new User_1.User();
            user.username = data.username;
            user.password = await (0, bcrypt_1.hash)(data.password, 5);
            await user.save();
            return {
                status: true,
                message: "User registered successfuly !",
            };
        }
        catch (e) {
            console.log("something went wrong while registring new user : ", e);
            return {
                status: false,
                message: "Something went wrong !",
            };
        }
    }
    async login(data) {
        if (!data.username || !data.password) {
            return {
                status: false,
                message: "Invalid Data !",
            };
        }
        try {
            const user = await User_1.User.findOne({ where: { username: data.username } });
            if (!user) {
                return {
                    status: false,
                    message: "User not found !",
                };
            }
            const valid = await (0, bcrypt_1.compare)(data.password, user.password);
            if (!valid) {
                return {
                    status: false,
                    message: "Invalid Password",
                };
            }
            return {
                status: true,
                message: "Login Successfuly !",
            };
        }
        catch (e) {
            console.log("something went wrong : ", e);
            return {
                status: false,
                message: "Something Went Wrong !",
            };
        }
        return {
            status: false,
            message: "Unfinished !",
        };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "wussup", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => responses_1.AuthResponse),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => responses_1.AuthResponse),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.LoginInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map