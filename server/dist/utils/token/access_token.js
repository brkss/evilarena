"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const generateAccessToken = (user) => {
    const token = (0, jsonwebtoken_1.sign)({
        userId: user.id,
    }, process.env.ACCESS_SECRET, {
        expiresIn: "15m",
    });
    return token;
};
exports.generateAccessToken = generateAccessToken;
//# sourceMappingURL=access_token.js.map