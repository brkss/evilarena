"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../../entity/User");
const _1 = require(".");
const refreshToken = async (req, res) => {
    const token = req.cookies.uid;
    if (!token) {
        res.send({
            status: false,
            token: "",
        });
    }
    let payload = null;
    try {
        payload = (0, jsonwebtoken_1.verify)(token, process.env.REFRESH_SECRET);
    }
    catch (e) {
        console.log("Invald Token =>>> ", e);
        return res.send({
            token: "",
            status: false
        });
    }
    if (!payload) {
        return res.send({
            status: false,
            token: ""
        });
    }
    const user = await User_1.User.findOne({ where: { id: payload.userId } });
    if (!user) {
        return res.send({
            token: "",
            status: false
        });
    }
    const rt = (0, _1.generateAccessToken)(user);
    res.cookie('uid', (0, _1.generateRefreshToken)(user), {
        httpOnly: true
    });
    return res.send({
        token: rt,
        status: true
    });
};
exports.refreshToken = refreshToken;
//# sourceMappingURL=refresh.js.map