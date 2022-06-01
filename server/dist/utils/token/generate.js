"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
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
const generateRefreshToken = (user) => {
    const token = (0, jsonwebtoken_1.sign)({
        userId: user.id,
    }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
    return token;
};
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=generate.js.map