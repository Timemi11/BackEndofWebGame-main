"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineMiddleware = void 0;
const line_1 = require("../util/line");
const lineMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authentication = req.headers["authorization"];
    console.log("authentication");
    console.log(authentication);
    if (!authentication) {
        console.log("!authentication");
        console.log(authentication);
        return res.status(401).json({ message: authentication });
    }
    const [type, token] = authentication.split(" ");
    if (type !== "Bearer" || !token) {
        console.log("!Bearer");
        console.log(type);
        console.log(token);
        return res.status(401).json({ message: authentication });
    }
    try {
        yield (0, line_1.verifyToken)(token);
        const userProfile = yield (0, line_1.getUserProfile)(token);
        return userProfile;
    }
    catch (error) {
        console.log(error);
        throw new Error(error); // error
    }
});
exports.lineMiddleware = lineMiddleware;
