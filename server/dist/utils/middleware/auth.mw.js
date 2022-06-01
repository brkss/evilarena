"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const isUserAuth = ({ context }, next) => {
    const authorization = context.req.headers['authorization'];
    if (!authorization) {
        throw new Error('Not Authenticated !');
    }
    const token = authorization.split(' ')[1];
    if (!token) {
        throw new Error("Bad Token !");
    }
    try {
        const payload = (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_SECRET);
        context.payload = payload;
    }
    catch (e) {
        throw new Error('Invalid Token !');
    }
    return next();
};
exports.isUserAuth = isUserAuth;
//# sourceMappingURL=auth.mw.js.map